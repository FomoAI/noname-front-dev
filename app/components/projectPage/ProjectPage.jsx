import { useCallback , useState, useEffect, useLayoutEffect} from "react"
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import { Contract } from "ethers";
import { useDispatch,useSelector } from 'react-redux'
import { toggleModal ,closeModal} from '../../store/slices/modalsSlice'
import { getPoolInfo, getMeInPool} from "../../smart/initialSmartMain";
import { chainIdValue } from "../../config/provider";
import checkIsClaim from "../../utils/checkIsClaim";
import ProjectCard from '../../assets/components/projectCard/ProjectCard'
import ProjectInfoBlock from '../../assets/components/projectInfoBlock/ProjectInfoBlock'
import ProjectFilter from '../../assets/components/projectFilter/ProjectFilter'
import ProjectLinks from '../../assets/components/projectLinks/ProjectLinks'
import AboutCompany from '../../assets/components/AboutComapany/AboutCompany'
import BecomeParticipant from '../../assets/components/becomeParticipant/BecomeParticipant'
import Accordion from '../accordion/Accordion'
import RecommendedNews from '../recommended/RecommendedNews'
import Modal from '../../assets/components/modal/Modal'
import Success from '../../assets/components/success/Success'
import useModal from '../../hooks/useModal'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import OffersModal from '../../assets/components/offersModal/OffersModal'
import SwitchModal from '../../assets/components/switchModal/SwitchModal'
import LoadingModal from '../../assets/components/LoadingModal/LoadingModal'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import { wagmiClient,ethereumClient } from '../../config/provider'
import useAuth from '../../hooks/useAuth';
import balanceParse from "../../utils/balanceParse"
import addReferral from "../../services/addReferral";
import getInviterInfo from "../../utils/getInviterInfo";
import getUserData from "../../utils/getUserData";
import addProjectToUser from '../../services/addProjectToUser'
import styles from '../styles/project-page.module.scss'
import getProjectStatus from '../../utils/getProjectStatus'
import Loader from '../../assets/components/loader/Loader'

const filtersInitialState = [
  {
      title:'Investors',
      isSelect:true,
  },
  {
      title:'Team',
      isSelect:false,
  },
  {
      title:'Partners',
      isSelect:false,
  },
]

async function get_allowance_sum() {
  const address_nft= '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4';
  const abi_nft = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract_nft=new Contract(address_nft, abi_nft, provider);
  const allowance_sum = await contract_nft.allowance(window.ethereum.selectedAddress,'0x86aa9D76EEe0AF62dB3E5d595294Ca41Cb084293');
  let ds = ethers.utils.formatUnits(allowance_sum,6)
  return ds
}

async function get_allowance_state(price) {
 let allowance_sum = await get_allowance_sum()
 console.log('!!!',allowance_sum,price)
 for(var i = 0; i < 10;i++){
  await sleep(3000);
  allowance_sum = await get_allowance_sum()    
  if (allowance_sum  >=price){
    return true
  }
  }
 return false
}

async function changeNetwork(){

  const result= await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0x144",
        rpcUrls: ["https://mainnet.era.zksync.io"],
        chainName: "zkSync Era Mainnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18
        },
        blockExplorerUrls: ["https://explorer.zksync.io/"]
    }]
    //params: [{
    //    chainId: "0x61",
    //    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    //    chainName: "BNB Smart Chain Testnet",
    //    nativeCurrency: {
    //        name: "BNB",
    //        symbol: "tBNB",
    //        decimals: 18
    //    },
    //    blockExplorerUrls: ["https://testnet.bscscan.com/"]
    //}]
});
}

async function get_allowance() {
 try{
  const address_nft= '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4';
  const abi_nft = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract_nft=new Contract(address_nft, abi_nft, provider);
  const allowance_sum = await contract_nft.allowance(window.ethereum.selectedAddress,'0x86aa9D76EEe0AF62dB3E5d595294Ca41Cb084293');
  let ds = ethers.utils.formatUnits(allowance_sum,6)
  return true
 }
 catch (err) {
  console.info('err', err.message);
  return true
 }
}

async function getStatus() {
 try{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const chainId = await provider.getNetwork()
  if (chainId.chainId!=chainIdValue){
    return true
  }
 } catch (err) {
  console.info('err', err.message);
  return false
}
 return false
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function set_allowance_for_mint(sum,quantity) {
  const address_nft= '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4';
  const abi_nft = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const contract_nft=new Contract(address_nft, abi_nft, provider); 
  let pr_sum = sum*10000
  let sum_last= pr_sum.toString()+"00";

  const daiContractWithSigner = contract_nft.connect(signer);
  const allowance_sum = await contract_nft.allowance(window.ethereum.selectedAddress,'0x86aa9D76EEe0AF62dB3E5d595294Ca41Cb084293');
  let ds = ethers.utils.formatUnits(allowance_sum,6)
  let kala =0
  if (true){
    try {
        kala = await daiContractWithSigner.approve('0x86aa9D76EEe0AF62dB3E5d595294Ca41Cb084293',ethers.BigNumber.from(sum_last));
      } catch (err) {
        console.info('err in approve', err.message);
        return false
    }}
  return true
}

async function provide_for_mint(sum,quantity) {
  const address_nft= '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4';
  const abi_nft = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const contract_nft=new Contract(address_nft, abi_nft, provider); 
  let pr_sum = sum*10000
  let sum_last= pr_sum.toString()+"00";
  const address_nft_sale= '0x86aa9D76EEe0AF62dB3E5d595294Ca41Cb084293';
  const abi_nft_sale = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"_buyer","type":"address"}],"name":"Bought","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_media","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"NFTcount_public","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"addressInWl","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"buy_nft_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"},{"internalType":"address","name":"referal","type":"address"}],"name":"buy_nft_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_Nft_count_and_owners","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_all_rewards","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"get_prise_presale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nft_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"refFather","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_NFTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ref_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"referals_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referal","type":"address"}],"name":"reward_sum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"},{"internalType":"address[]","name":"_wl","type":"address[]"}],"name":"startNFTsale_media","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_presale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_token_limit","type":"uint256"},{"internalType":"uint256","name":"_start_time","type":"uint256"},{"internalType":"uint256","name":"_end_time","type":"uint256"},{"internalType":"uint256","name":"_new_pice","type":"uint256"}],"name":"startNFTsale_public","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wl_presale","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];  const contract_nft_sale=new Contract(address_nft_sale, abi_nft_sale, provider);   
  const daiContractWithSigner_sale = contract_nft_sale.connect(signer);
  try {
      await daiContractWithSigner_sale.buy_nft_presale(quantity)
    } catch (err) {
      console.info('err in transaction', err.message);
      return false
  }
  return true
}

const participateSteps = [
  {
      title:'Staking',
      description:'Preparing for whitelist',
      isActive:true,
  },
  {
      title:'Purchase',
      description:'You can fill your allocations',
      isActive:true,
  },
  {
      title:'Distribution',
      description:'Claim allocations',
      isActive:false,
  }
]

export default function ProjectPage({project}) {
  const {state,modalHandler} = useModal()
  const dispatch = useDispatch()
  const isBuyModal = useSelector((state) => state.modals.offers.state)
  const router = useRouter()

  const [steps,setSteps] = useState(() => participateSteps)
  const [confirmStaking,setConfirmStaking] = useState(false)
  const [main_btn_text,setMain_btn_text] = useState('Approve')  
  const [main_btn_content,setMain_btn_content] = useState('confirm-offers')  
  const [pending,setPending] = useState(false)  
  const [isSuccessAlert, setSuccessAlert] = useState(false)
  const [open, setOpen] = useState(false)
  const [errorAlert, setAlert] = useState(false)
  const [errorAlert2, setAlert2] = useState(false)
  const [isSuccessAlert2, setSuccessAlert2] = useState(false)
  const [isClaim,setIsClaim] = useState(false)
  const [isClaimed,setIsClaimed] = useState(false)
  const [myInvest,setMyInvest] = useState(0)
  const [loader,setLoader] = useState(false)

  const buyModalHandler = async (event,data,price) => {
    if(typeof event !== 'string' && event.target.id === 'toggle-modal'){
      event.stopPropagation()
      dispatch(closeModal('offers'))
      return
    }
    if(event == 'confirm-offers'){ 
        setPending(true)
        set_allowance_for_mint(price,data.quantity).then(result => {
          if (result==false){
            setPending(false)
            setSuccessAlert2(result)
            setAlert2(true)
            dispatch(toggleModal('offers'))
            sleep(3000).then(result => setAlert(false))
            return          
          }
        
          get_allowance_state(price).then( async (result) => {
            setPending(false)
            setSuccessAlert2(result)
            setAlert2(true)
            if (result == true){
                setMain_btn_text('Buy')
                setMain_btn_content('Mint_offer')
                console.log('Main_btn_text text set to Buy')
              
            }
            dispatch(toggleModal('offers'))
            sleep(3000).then(result => setAlert2(false))
          })
        })
        return
    }
 
    if(event == 'Mint_offer'){ 
        setPending(true)
        setMain_btn_text('Approve')
        setMain_btn_content('confirm-offers') 
        provide_for_mint(price,data.quantity).then(result => {
        setPending(false)
        setSuccessAlert(result)
        setAlert(true)       
        sleep(3000).then(result => setAlert(false))
      }) 
      dispatch(closeModal('offers'))
      return}
  }
  const switchModalHandler= (event) => {

    if(typeof event !== 'string' && event.target.id === 'toggle-modal'){
      event.stopPropagation()
      setOpen(false)
      return
    }

    if(event == 'active_switch') {

      changeNetwork().then(result => setOpen(false))
      setOpen(false)
      return
    }
  } 
  const alertHandler = () => {
    setAlert(false)
    return
  }
  const alertHandler2 = () => {
    setAlert2(false)
    return
  }

  //get_allowance().then(result => {
  //  if (result){
  //    setwalletState(true)
  //
  //  }
  //  }) 
  
  useEffect(() => {
    const initialProjectPage = async () => {
      setLoader(true)

      const {response} = await getPoolInfo(project?.poolId)

      const claimData = await checkIsClaim(project._id)

      setIsClaimed(claimData?.isAlreadyClaim)

      if(window?.ethereum?.selectedAddress){
        const {data} = await getMeInPool(project?.poolId,window.ethereum.selectedAddress)
        setMyInvest(data.invest)
      }

      if(response?.isClaim){
        setSteps(participateSteps.map((step) => {
          return {...step,isActive:true}
        }))
        setIsClaim(response.isClaim)
        setLoader(false)
        
        return
      }

      const value = await getProjectStatus(participateSteps,project)
      const result = await getStatus()

      setSteps(value)
      setOpen(result)
      setLoader(false)
    }

    initialProjectPage()
  },[])

  if(loader) return <Loader/>

  return (
    <>
    <div className={styles.container}>
    <div className={styles.body}>
        <ProjectCard 
        myInvest={myInvest}
        isClaimed={isClaimed}
        isClaim={isClaim}
        steps={steps}
        modalHandler={modalHandler} 
        project={project} 
        />
        <ProjectInfoBlock 
        tags={project.tags}
        img={project?.projectImg ? project?.projectImg : ''} 
        text={project?.descriptionFull ? project?.descriptionFull : ''}
        />
    </div>
    <div className={styles.filtersInfo}>
      <ProjectFilter 
      project={project} 
      filtersInitialState={filtersInitialState}/>  
    </div>
    <div className={styles.about}>
      <AboutCompany project={project}/>
    </div>
    <div className={styles.faq}>
      <Accordion items={project.faq} title={'FAQ'}/>
    </div>
    <div className={styles.risks}>
      <Accordion items={project.risks} title={'Risks'}/>
    </div>
    <div className={styles.recommended}>
      <RecommendedNews news={project.news}/>
    </div>
    <div className={styles.becomeParticipant}>
      <BecomeParticipant 
      modalHandler={modalHandler} 
      project={project}/>
    </div>
    <div className={styles.links}>
      <ProjectLinks links={project.links}/>
    </div>
    </div>
    <Modal handler={buyModalHandler} isVisible={isBuyModal}>
      <OffersModal handler={buyModalHandler} button_text={main_btn_text} button_res={main_btn_content}/>
    </Modal>
    <SwitchModal handler={switchModalHandler} isVisible={open}/>
    <Modal isVisible={pending}>
    <LoadingModal
          title={confirmStaking ? 'Confirm Staking' : 'Pending'}
          subTitle={confirmStaking ? '' : ''}
          description={confirmStaking ? 'Confirm this transaction in your wallet' : 'Please wait for transaction confirmation'}
          />
    </Modal>
    <Modal handler={modalHandler} isVisible={state} >
      <Success/>
      <div className={styles.successBtn}>
        <SquareBtn 
        handler={() => router.push('/waitinglist')} 
        width='330' 
        text={'Go to waiting list'}/>
      </div>
    </Modal>
    <CustomAlert
        handler={alertHandler}
        isVisible={errorAlert}
        type={isSuccessAlert ? 'success' : 'error'}
        title={isSuccessAlert ? 'Successful!' : 'Opps!'}
        text={isSuccessAlert ? 'You have successfully become a member of No name.' : 'Some error occuried!'}
    />
    <CustomAlert
        handler={alertHandler2}
        isVisible={errorAlert2}
        type={isSuccessAlert2 ? 'success' : 'error'}
        title={isSuccessAlert2 ? 'Successful!' : 'Opps!'}
        text={isSuccessAlert2 ? 'Your request has been successfully approved!' : 'Some error occuried!'}
    />
    </>
  )
}
