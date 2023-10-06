import { ethers,utils } from "ethers";
import { Contract } from "ethers";
import {decimals,adminAddress} from '../config/provider'
import getUserStatusByIndex from "../utils/getUserStatusByIndex";
import getInviterInfo from "../utils/getInviterInfo";
import getUserById from '../services/getUserById'
import getUserData from '../utils/getUserData'

export const mainPoolAddress = '0xf4E1a1295A4aD65181CF57FB25fa0f2cff221699'

export function bigNumber_to_number(bign,decimals){
    return ethers.utils.formatUnits(bign,decimals)
}

export function number_to_bigNumber(bign,decimals){
    let sum_last= Math.floor(bign).toString()
    for (let i = 0; i < decimals; i++) {
      sum_last += "0";
    }	
    return ethers.BigNumber.from(sum_last)
}

const getNftContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const address_nft = '0xD2651f084d7E98904a102838c39EFE4D7ADEDe69';
    const abi_nft = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"blocked","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"pool","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"main_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"main_contract_set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stacked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const contract_nft = new Contract(address_nft, abi_nft, provider); 
    const daiContractWithSigner_nft = contract_nft.connect(signer);

    return {contract_nft,daiContractWithSigner_nft}
}

const getMainPoolContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const address_pool = mainPoolAddress;
    const abi_pool = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"PoolOver","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"_seller","type":"address"}],"name":"Sold","type":"event"},{"inputs":[{"internalType":"uint256","name":"_NFT_ID","type":"uint256"}],"name":"Claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountToSell","type":"uint256"},{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"_refFather","type":"address"}],"name":"Invest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTInfos","outputs":[{"internalType":"uint256","name":"poolID","type":"uint256"},{"internalType":"uint256","name":"coins","type":"uint256"},{"internalType":"address","name":"creator","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"R_points","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_commission","type":"uint256"}],"name":"change_commission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"},{"internalType":"uint256","name":"_poolID","type":"uint256"},{"internalType":"uint256","name":"_changerate","type":"uint256"}],"name":"change_endedPoolToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"father","type":"address"}],"name":"change_reffather","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pool_id","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_minInvest","type":"uint256"},{"internalType":"uint256","name":"_maxInvest","type":"uint256"},{"internalType":"uint256","name":"_commission","type":"uint256"},{"internalType":"uint256","name":"_mediaComission","type":"uint256"},{"internalType":"address[]","name":"_media","type":"address[]"}],"name":"createPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_greenTime","type":"uint256"},{"internalType":"uint256","name":"_yellowTime","type":"uint256"},{"internalType":"uint256","name":"_greenZone","type":"uint256"},{"internalType":"uint256","name":"_yellowZone","type":"uint256"},{"internalType":"uint256","name":"_nftStakeNeed","type":"uint256"}],"name":"createPrePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"bool","name":"_is_return","type":"bool"}],"name":"end_pool_by_admin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"endedPools","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"bool","name":"claimstage","type":"bool"},{"internalType":"uint256","name":"changerate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getAllPartnersFromPool","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"investment","type":"uint256"},{"internalType":"uint256","name":"NFT_ID","type":"uint256"},{"internalType":"uint256","name":"NFT_count","type":"uint256"}],"internalType":"struct MShop.Partner[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getInfobyNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getMeInPool","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"investment","type":"uint256"},{"internalType":"uint256","name":"NFT_ID","type":"uint256"},{"internalType":"uint256","name":"NFT_count","type":"uint256"}],"internalType":"struct MShop.Partner","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"get_user_board","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"get_user_can_invest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"get_user_can_invest_time","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"get_user_in_zone","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address[]","name":"_arr","type":"address[]"}],"name":"get_user_place_in_arr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"_adr","type":"address"}],"name":"get_user_stacked_NFT_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_array_users","type":"address[]"}],"name":"is_used_var_address","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"nft_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool_id","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"mediaComission","type":"uint256"},{"internalType":"uint256","name":"partnersCount","type":"uint256"},{"internalType":"uint256","name":"amountUSDTOfPool","type":"uint256"},{"internalType":"uint256","name":"maxAmountOfPool","type":"uint256"},{"internalType":"bool","name":"poolEnd","type":"bool"},{"internalType":"uint256","name":"maxInvest","type":"uint256"},{"internalType":"uint256","name":"minInvest","type":"uint256"},{"internalType":"uint256","name":"commission","type":"uint256"},{"internalType":"uint256","name":"nftStakeNeed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"prePools","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"greenTime","type":"uint256"},{"internalType":"uint256","name":"yellowTime","type":"uint256"},{"internalType":"uint256","name":"time_range_yellow","type":"uint256"},{"internalType":"uint256","name":"greenZone","type":"uint256"},{"internalType":"uint256","name":"yellowZone","type":"uint256"},{"internalType":"uint256","name":"nftStakeNeed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"refFather","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"stackeNFTprePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token_nft","outputs":[{"internalType":"contract IERC721_1","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token_nft_2","outputs":[{"internalType":"contract IERC721_2","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
    const contract_pool = new Contract(address_pool, abi_pool, provider); 
    const daiContractWithSigner_pool = contract_pool.connect(signer);

    return {contract_pool,daiContractWithSigner_pool}
}

const getNoNameNftContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
  const address_nft= '0xAf43795938065bbBf59FFbdeE58bc2a6eae561D3';
  const abi_nft = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pool",
				"type": "uint256"
			}
		],
		"name": "addBlockedTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pool",
				"type": "uint256"
			}
		],
		"name": "removeBlockedTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pool",
				"type": "uint256"
			}
		],
		"name": "removeBlockedTokens_return",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "setBlockProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenN",
				"type": "uint256"
			}
		],
		"name": "stakeToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "blocked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pool",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "blockProvider",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Claimers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getBlockedNow",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getStacked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "returned_pools",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stacked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
  ]
  const contract_nft_nn = new Contract(address_nft, abi_nft, provider); 
  const daiContractWithSigner_nft_nn = contract_nft_nn.connect(signer);

  return {contract_nft_nn,daiContractWithSigner_nft_nn}
}

const getUSDContract = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
	const address_usd= '0x0f18880a51C393AD95f853199781698F6e86dBDc';
	const abi_usd = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
	const contract_usd=new Contract(address_usd, abi_usd , provider); 
	const daiContractWithSigner_usd = contract_usd.connect(signer);

	return {contract_usd,daiContractWithSigner_usd}
}

 // Апрув управления средствами $ для основного смартконтракта(sum(int) - кол-во $)

export async function approveSum (sum) {
	const address_pool= '0xf4E1a1295A4aD65181CF57FB25fa0f2cff221699';

  	let sum_last = number_to_bigNumber(sum,decimals)

    try {
		const {daiContractWithSigner_usd} = getUSDContract()
		
        const res = await daiContractWithSigner_usd.approve(address_pool,sum_last);

		return {res,success:true}
      } catch (err) {
        console.info('err in approve', err.message);

        return {res:{},success:false}
    }
}

export async function getNoNameNFTBalance(user) {
  try {
      const {contract_nft_nn} = getNoNameNftContract()

      const sum = await contract_nft_nn.balanceOf(user);
	
      return {sum:bigNumber_to_number(sum,0),success:true}
    } catch (err) {
      console.info('err in approve', err.message);
      return {sum:0,success:false}
  }
}

// Получить кол-во застаканных NFT у юзера (user(str) - адрес пользователя)
export async function getNoNameNFTStakedBalance(user) {
  try {
    const {contract_nft_nn} = getNoNameNftContract()

    const sum = await contract_nft_nn.getBlockedNow(user);
    return {sum:bigNumber_to_number(sum,0),success:true}
  } catch (err) {
      console.info('err in approve', err.message);
      return {sum:0,success:false}
  }
}

export async function getUserNftOnWallet(user) {
    const {contract_nft} = getNftContract()
    
    try {
        const sum = await contract_nft.balanceOf(user);

        return ({sum:bigNumber_to_number(sum,0),status:200})
      } catch (err) {
        console.info('err in approve', err.message);
        return ({sum:0,error:err.message})
    }
}

export async function getUserTokens(user,index_of_token) {
    const {contract_nft} = getNftContract()

    try {
        const NFT_ID = await contract_nft.tokenOfOwnerByIndex(user,index_of_token);

        return {nftId:NFT_ID,err:err.message}
      } catch (err) {
        console.info('err in approve', err.message);
        return {nftId:0,err:err.message}
    }
}

export async function getPoolId() {
    try{
        const {contract_pool} = getMainPoolContract()

        const pool_id = await contract_pool.pool_id();

        return {poolId:bigNumber_to_number(pool_id,0),status:200}
    }
    catch (err) {
        console.info('err', err.message);
        return (0,err.message)
    }
}

export async function endPoolByAdmin(poolID,is_return) {  
    try {
        const {daiContractWithSigner_pool} = getMainPoolContract()

        await daiContractWithSigner_pool.end_pool_by_admin(poolID,is_return);

      } catch (err) {
        console.info('err in transaction', err.message);
        
        return {success:false,error:err.message}
    }
    return {success:true,error:''}
}

export async function createPool(pool_id,strat_time,green_time,yellow_time,green_zone,yellow_zone,nft_stake_need,max_invest,name,min_invest_user,max_invest_user,comission,media_comission,mediaInitial) {
    const media = 
    mediaInitial?.length
    ?
    mediaInitial.filter((item) => item?.length)
    :
    []

    const {daiContractWithSigner_pool} = getMainPoolContract()

    try {
        await daiContractWithSigner_pool.createPrePool(strat_time,green_time,yellow_time,green_zone,yellow_zone,nft_stake_need);

      } catch (err) {
        console.info('err in transaction', err.message);
        return {createSuccess:false,err:err.message}
    }
    try {
        await daiContractWithSigner_pool.createPool(pool_id,number_to_bigNumber(max_invest,decimals),name,number_to_bigNumber(min_invest_user,decimals),number_to_bigNumber(max_invest_user,decimals),comission,media_comission,media);

      } catch (err) {
        console.info('err in transaction', err.message);
        return {createSuccess:false,err:err.message}
    }
    return {createSuccess:true,err:''}
}
  
export async function getPoolInfo(poolID) {
    try{
      const {contract_pool} = getMainPoolContract()

      const response = await contract_pool.endedPools(poolID);
		
	  const resData = {}

	  resData.isClaim = response.claimstage
	  resData.claimed = bigNumber_to_number(response.changerate,decimals)
	  resData.token = response.token

	  return {response:resData,success:true,err:''}
    }
    catch (err) {
      console.info('err', err.message);

      return {success:false,err:err.message}
    }
}

// Блокировка NFT для участия в пуле(poolID(int) - ID пула, quantity(int) - кол-во NFT)
export async function stackeNFTprePool(poolID,quantity) {  
  try {
      const {daiContractWithSigner_pool} = getMainPoolContract()

      await daiContractWithSigner_pool.stackeNFTprePool(poolID,Number(quantity));

	  return {success:true}
	  
    } catch (err) {
      console.info('err in transaction', err.message);

      return {success:false,err:err.message}
  }
}

// Инвестировать в пул (amount(int) - кол-во $ перед ним нужен апрув на такую-же сумму + % комиссии(функция апрува расписана в этом доке уже с учётом комиссии),poolID - ID пула,refFather(str) - адрес пригласителя, если такого нет, то можно указать адрес админа)
export async function investSum(amount,poolID) {  0
  try {
	const userData = getUserData()

	const {user} = await getUserById(userData?._id)

	const refFather = user?.inviter
	
    const {daiContractWithSigner_pool} = getMainPoolContract()

    await daiContractWithSigner_pool.Invest(number_to_bigNumber(amount,decimals),poolID,refFather || adminAddress);

    return {success:true,err:''}
  } catch (err) {
    console.info('err in transaction', err.message);

    return {success:false,err:err.message}
  }
}

export async function getUserInZone(poolID,user_adr) {
	try{
		const {contract_pool} = getMainPoolContract()

		const data = await contract_pool.get_user_in_zone(poolID,user_adr);

		return {data:bigNumber_to_number(data,0),success:true}
	}
	catch (err) {
		console.info('err', err.message);
		
		return {success:false,data:{}}
	}
}
   
export async function getUserCanInvest(poolID,user_adr) {
	try{
		const {contract_pool} = getMainPoolContract()

		const isCanInvest = await contract_pool.get_user_can_invest(poolID,user_adr);
		
		return {isCanInvest,success:true}
	}
	catch (err) {
		console.info('err', err.message);

		return {isCanInvest:false,success:false}
	}
}
   
export async function getUserBoard(poolID) {
 try{
	const {contract_pool} = getMainPoolContract()

	const boards = await contract_pool.get_user_board(poolID);

	return {boards,success:true}
 }
 catch (err) {
	console.info('err', err.message);

	return {boards:{},success:false}
 }
}

export async function getTotalStakeInPool(poolID) {
	try{
		const {boards} = await getUserBoard(poolID)
		
		if(!boards?.length){
			throw new Error('User list is empty')
		}

		const usersList = boards[0]
		let totalStaked = 0

		for (let i = 0; i < usersList.length; i++) {
			const userAddress = usersList[i];

			const {success,sum} = await getNoNameNFTStakedBalance(userAddress)

			if(success){
				totalStaked = totalStaked + Number(sum)
			}
		}

		return {totalStaked,success:true}
	}catch(err){
		console.info(err)

		return {totalStaked:0,success:false}
	}
}

//// Получить меня как Инвесторов пула(poolID(int) - ID пула,,user_adr(str) - адрес юзера)
//// response tuple
//// tuple(str - адрес инвестора, BigNumber - кол-во $ инвестированых в wei, int - PoolNFT_ID которое выдали пользователю за инвестиции, int - всегда 0)
export async function getMeInPool(poolID,user_adr) {
	try{
		const {contract_pool} = getMainPoolContract()

		const data = await contract_pool.getMeInPool(poolID,user_adr);

		const result = {}

		result.invest = Number(bigNumber_to_number(data.investment,decimals))
		result.nftId = bigNumber_to_number(data.NFT_ID,0)
		result.nftCount = bigNumber_to_number(data.NFT_count,0)

		return {data:result,success:true}
	}
	catch (err) {
		console.info('err', err.message);
		return {data:{},success:false}
	}
}

export async function getAllPartnersFromPool(poolID) {
	try{
		const {contract_pool} = getMainPoolContract()

		const response = await contract_pool.getAllPartnersFromPool(poolID)
		
		if(!response?.length){
			throw new Error('Get all partners error')
		}
		
		let sumInvest = 0
		let participants = response.length

		for (let i = 0; i < response.length; i++) {
			const partner = response[i];
			
			const invest = bigNumber_to_number(partner.investment,decimals)
			
			sumInvest = sumInvest + Number(invest)
		}

		return {response,success:true,sumInvest,participants}
	}
	catch (err) {
		console.info('err', err.message);

		return {success:false}
	}
}

export async function getLeaderBoardData(poolId) {
	try{
		const {boards,success} = await getUserBoard(poolId)

		if(!success){
			throw Error('Leader board smart error')
		}
	
		const boardList = []

		for (let i = 0; i < boards[0].length; i++) {
			const address = boards[0][i];

			const investValue = bigNumber_to_number(boards[1][i],0);
			
			const sum = await getNoNameNFTStakedBalance(address)

			// const rank = (sum * 300) + Number(getUserData()?.projects.length) * 50

			boardList.push({rank: i + 1,address,totalScore:investValue})
		}
	
		const {data} = await getUserInZone(poolId,window.ethereum.selectedAddress)

		const status = getUserStatusByIndex(data)
	
		const userData = boardList.find((user) => {
			return user.address.toLowerCase() === window.ethereum.selectedAddress?.toLowerCase()
		})

		if(userData){
			userData.status = status
		}

		return {boardList,userData}

	}catch(error){
		console.info(error)

		return {success:false}
	}
}

export async function getUserInvestInfoEndedPool(poolId,userAddress){
	try{
		const {contract_pool} = getMainPoolContract()

		const {data} = await getMeInPool(poolId,userAddress)

		const response = await contract_pool.getInfobyNFT(Number(data.nftId));
		
		const infoBuyNft = {}

		infoBuyNft.poolID = bigNumber_to_number(response[0],0)
		infoBuyNft.invest = bigNumber_to_number(response[1],decimals)

		return {data:infoBuyNft,success:true}
	}catch(error){
		console.log(error)

		return {data:null,success:false}
	}
}
// Добавить токены в пул для раздачи тем кто может сделать claim (addressT(str) - адрес Токена для клейма в сети,poolID - ID пула,sumT(int) - сумма токенов для клейма,decimals(int) - decimals самого токена,sum_invest(int) - сумма инвестиций в $)
export async function changeEndedPoolToken(addressT,poolID,sumT,decimals,sum_invest) {  
	try {
		const {daiContractWithSigner_pool} = getMainPoolContract()

		let changerate1 = Number(sumT/sum_invest.toFixed(4));  	
		changerate1 = changerate1 * 10000;	
		let changerate = number_to_bigNumber(Math.floor(changerate1),decimals - 4) 

		await daiContractWithSigner_pool.change_endedPoolToken(addressT,poolID,changerate);

		return {success:true}
	} catch (err) {
		console.info('err in transaction', err.message);
	  
		return {success:false}
	}
}

async function approveNft(nftId) {
    try {
		const {daiContractWithSigner_nft} = getNftContract()

		const address_pool = '0xf4E1a1295A4aD65181CF57FB25fa0f2cff221699';

        await daiContractWithSigner_nft.approve(address_pool,nftId);

		return {success:true}
      } catch (err) {
        console.info('err in approve', err.message);

        return {success:false}
    }
}

export async function Claim(poolId,address) {  
	try {
		const {daiContractWithSigner_pool} = getMainPoolContract()

		const {data} = await getMeInPool(poolId,address)
		
		if(!data.nftId){
			throw new Error("No nft id")
		}
		const nftId = Number(data.nftId)

		const {success} = await approveNft(nftId)

		if(!success){
			throw new Error("Approve nft error")
		}
	
		setTimeout(async () => {
			await daiContractWithSigner_pool.Claim(nftId)
		},4500)

		return {success:true}
	  } catch (err) {
		console.info('err in transaction', err.message);
		return {success:false}
	}
}
  
/////////////////////////// Функции основного смарта
/////////////////////////////////Изменение комиссии (poolID(int) - ID пула, quantity(int) - % новой комиссии)  
export async function changeComission(poolID,quantity) {  
	try {
		const {daiContractWithSigner_pool} = getMainPoolContract()

		await daiContractWithSigner_pool.change_commission(poolID,quantity);

		return {success:false}
	  } catch (err) {
		console.info('err in transaction', err.message);

		return {success:true}
	}
  }
  