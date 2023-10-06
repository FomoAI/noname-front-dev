import { useState } from 'react'
import styles from './offers.module.scss'
import BlueInput from '../../../components/UI/inputs/BlueInput'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import LoadingModal from '../LoadingModal/LoadingModal'
import CustomAlert from '../CustomAlert/CustomAlert'
import { ethers } from "ethers";
import { Contract } from "ethers";
import {useEffect} from 'react'

async function get_allowance() {
 try{
  const address_nft= '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4';
  const abi_nft = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract_nft=new Contract(address_nft, abi_nft, provider);
  const allowance_sum = await contract_nft.allowance(window.ethereum.selectedAddress,'0x86aa9D76EEe0AF62dB3E5d595294Ca41Cb084293');
  let ds = ethers.utils.formatUnits(allowance_sum,6)
  return ds
 }
 catch (err) {
  return 0
 }
 }


function getMint_price() {
  const price_value=200;
  return (price_value)
}

function get_sale_price(data,price){
  const prive_value= price;
  const quant_col= parseInt(data.quantity,10)
  let sur=prive_value*quant_col;
  if (quant_col>2){
    sur=prive_value*quant_col*9170/10000;
  }
  if (quant_col>6){
    sur=prive_value*quant_col*8580/10000;
  }
  if (quant_col>14){
    sur=prive_value*quant_col*8340/10000;
  }
  if (quant_col>32){
    sur=prive_value*quant_col*7580/10000;
  }
  return(sur)
}

export default function OffersModal({handler,button_text,button_res}) {
    const [data,setData] = useState({quantity:'',price:''})
    const [confirmStaking,setConfirmStaking] = useState(false)
    const [pending,setPending] = useState(false)
    let all_price = 0;
    let quanta = 0;
    let button_text_2 = button_text
    const [real_button_text,setReal_button_text] = useState(button_text)    
    const [real_button_res,setReal_button_res] = useState(button_res)   

    //getMint_price().then((response) => {
    //  all_price = response;
    //});
    all_price = getMint_price() 
    const [price_for_timer,set_price_for_timer] = useState(all_price )  
    //console.log('rerender',real_button_text)
    const [time, setTime] = useState(new Date());

    const [global_price,set_global_price] = useState(all_price );

    const inputsHandler = (event,id) => {
        
        setData((prev) => {
            quanta = {...prev,[id]:event.target.value};
            return {...prev,[id]:event.target.value}
        })
        set_global_price((prev2) => {
          get_allowance().then(result => {
            console.log('get_allowance', result)
            if (result < all_price ){
              button_text_2='Approve'
              setReal_button_text('Approve')
              setReal_button_res('confirm-offers')
            }
            else{
              button_text_2='Buy'
              setReal_button_text('Buy')
              setReal_button_res('Mint_offer')               
            }
            console.log(button_text_2)
          })
          all_price = getMint_price()
          all_price =get_sale_price(quanta,all_price )  
          set_price_for_timer(all_price)
          return {all_price}
        })
    }

    useEffect(() => {
      console.log('effect used')
      get_allowance().then(result => {
        // console.log('get_allowance', result,price_for_timer,(result < price_for_timer ))
        if (result < price_for_timer ){
          setReal_button_text('Approve')
          setReal_button_res('confirm-offers')
        }
        else{
          setReal_button_text('Buy')
          setReal_button_res('Mint_offer')               
        }
      })

    return;
    },[]);

  return (
    <>
        {
          confirmStaking || pending
          ?
          <LoadingModal
          title={confirmStaking ? 'Confirm Staking' : 'Pending'}
          subTitle={confirmStaking ? 'Staking 1 NFT' : 'View on explorer'}
          description={confirmStaking ? 'Confirm this transaction in your wallet' : 'Please wait for transaction confirmation'}
          />
          :
          <div className={styles.body}>
          <div className={styles.title}>
            Become part of No name
          </div>
          <div className={styles.info}>
            <div>Buy a piece of our NFT collection to become an important part of No name.</div>
            <div>Our special offer for you:</div>
            <div>Buying 3-7 NFT - 8.3% discount</div>
            <div>Buying 7-15 NFT - 14.2% discount</div>
            <div>Buying 15-33 NFT - 16.6% discount</div>
            <div>Buying 33 or more NTF - 24.2% discount</div>
            <div>(cost of 1 NFT is 200 USDC)</div>
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputWrapper}>
                <label 
                htmlFor='quantity'
                className={styles.label}>Quantity</label>
                <BlueInput
                type='number'
                id='quantity'
                value={data.quantity}
                handler={inputsHandler}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label 
                htmlFor='price'
                className={styles.label}>Price (USDC)</label>
                <BlueInput
                id='price'
                value={
                  isNaN(global_price.all_price)
                  ?
                  0
                  :
                  global_price.all_price
                }
                handler={inputsHandler}
                />
            </div>
          </div>
          <div className={styles.bottom}>
            You will gain access to your NFT after public sale
          </div>
          <div className={styles.btn}>
            <SquareBtn 
            handler={() => handler(real_button_res,data,global_price.all_price)} 
            text={real_button_text} 
            type='red' 
            width='550'
            />
          </div>
            </div>
        }



    </>

  )
}
