import { ethers } from "ethers";
import { Contract } from "ethers";
import { decimals } from "./provider";

//////// 2 функции для работы с BigNumber
//////// Перевод BigNumber в нормальное число
function bigNumber_to_number(bign,decimals){
  return ethers.utils.formatUnits(bign,decimals)
}

//////// Перевод нормальное число в BigNumber
function number_to_bigNumber(bign,decimals){
    let sum_last= pr_sum.toString()
    for (let i = 0; i < decimals; i++) {
      sum_last += "0";
    }	
    return ethers.BigNumber.from(sum_last)
}

//////////////////////////////////Контракт основной

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()
const address_pool= '0xf4E1a1295A4aD65181CF57FB25fa0f2cff221699';
const abi_pool = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"PoolOver","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"_seller","type":"address"}],"name":"Sold","type":"event"},{"inputs":[{"internalType":"uint256","name":"_NFT_ID","type":"uint256"}],"name":"Claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountToSell","type":"uint256"},{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"_refFather","type":"address"}],"name":"Invest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"NFTInfos","outputs":[{"internalType":"uint256","name":"poolID","type":"uint256"},{"internalType":"uint256","name":"coins","type":"uint256"},{"internalType":"address","name":"creator","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"R_points","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_commission","type":"uint256"}],"name":"change_commission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_adr","type":"address"},{"internalType":"uint256","name":"_poolID","type":"uint256"},{"internalType":"uint256","name":"_changerate","type":"uint256"}],"name":"change_endedPoolToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"father","type":"address"}],"name":"change_reffather","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pool_id","type":"uint256"},{"internalType":"uint256","name":"_max","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_minInvest","type":"uint256"},{"internalType":"uint256","name":"_maxInvest","type":"uint256"},{"internalType":"uint256","name":"_commission","type":"uint256"},{"internalType":"uint256","name":"_mediaComission","type":"uint256"},{"internalType":"address[]","name":"_media","type":"address[]"}],"name":"createPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_greenTime","type":"uint256"},{"internalType":"uint256","name":"_yellowTime","type":"uint256"},{"internalType":"uint256","name":"_greenZone","type":"uint256"},{"internalType":"uint256","name":"_yellowZone","type":"uint256"},{"internalType":"uint256","name":"_nftStakeNeed","type":"uint256"}],"name":"createPrePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"bool","name":"_is_return","type":"bool"}],"name":"end_pool_by_admin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"endedPools","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"bool","name":"claimstage","type":"bool"},{"internalType":"uint256","name":"changerate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"getAllPartnersFromPool","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"investment","type":"uint256"},{"internalType":"uint256","name":"NFT_ID","type":"uint256"},{"internalType":"uint256","name":"NFT_count","type":"uint256"}],"internalType":"struct MShop.Partner[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getInfobyNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getMeInPool","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"investment","type":"uint256"},{"internalType":"uint256","name":"NFT_ID","type":"uint256"},{"internalType":"uint256","name":"NFT_count","type":"uint256"}],"internalType":"struct MShop.Partner","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"}],"name":"get_user_board","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"get_user_can_invest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"get_user_can_invest_time","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"get_user_in_zone","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address[]","name":"_arr","type":"address[]"}],"name":"get_user_place_in_arr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"address","name":"_adr","type":"address"}],"name":"get_user_stacked_NFT_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_array_users","type":"address[]"}],"name":"is_used_var_address","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"nft_count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pool_id","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"mediaComission","type":"uint256"},{"internalType":"uint256","name":"partnersCount","type":"uint256"},{"internalType":"uint256","name":"amountUSDTOfPool","type":"uint256"},{"internalType":"uint256","name":"maxAmountOfPool","type":"uint256"},{"internalType":"bool","name":"poolEnd","type":"bool"},{"internalType":"uint256","name":"maxInvest","type":"uint256"},{"internalType":"uint256","name":"minInvest","type":"uint256"},{"internalType":"uint256","name":"commission","type":"uint256"},{"internalType":"uint256","name":"nftStakeNeed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"prePools","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"greenTime","type":"uint256"},{"internalType":"uint256","name":"yellowTime","type":"uint256"},{"internalType":"uint256","name":"time_range_yellow","type":"uint256"},{"internalType":"uint256","name":"greenZone","type":"uint256"},{"internalType":"uint256","name":"yellowZone","type":"uint256"},{"internalType":"uint256","name":"nftStakeNeed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"refFather","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_poolId","type":"uint256"},{"internalType":"uint256","name":"_NFTcount","type":"uint256"}],"name":"stackeNFTprePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token_nft","outputs":[{"internalType":"contract IERC721_1","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token_nft_2","outputs":[{"internalType":"contract IERC721_2","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const contract_pool=new Contract(address_pool, abi_pool, provider); 
const daiContractWithSigner_pool = contract_pool.connect(signer);

//////////////////// Контракт PoolNFT
const address_nft= '0xD2651f084d7E98904a102838c39EFE4D7ADEDe69';
const abi_nft = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"blocked","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"pool","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"main_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"main_contract_set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stacked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contract_nft=new Contract(address_nft, abi_nft, provider); 
const daiContractWithSigner_nft = contract_nft.connect(signer);

// Апрувнуть управление PoolNFT для основного смартконтракта(NFT_ID(int) - ID NFT)

async function set_allowance(NFT_ID) {

    try {
        kala = await daiContractWithSigner_nft.approve(address_pool,NFT_ID);
      } catch (err) {
        console.info('err in approve', err.message);
        return (false,err.message)
    }
    return (true,'200')
}

// Получить кол-во NFT у юзера (user(str) - адрес пользователя)

async function getUserNftOnWallet(user) {

    try {
        sum = await contract_nft.balanceOf(user);
      } catch (err) {
        console.info('err in approve', err.message);
        return (0,err.message)
    }
    return (sum,'200')
}

// Получить ID_NFT у юзера на балансе по индексу(user(str) - адрес пользователя,index_of_token(int) - индекс токена)
async function set_allowance(user,index_of_token) {

    try {
        NFT_ID = await contract_nft.tokenOfOwnerByIndex(user,index_of_token);
      } catch (err) {
        console.info('err in approve', err.message);
        return (0,err.message)
    }
    return (NFT_ID,'200')
}

////////////////////// Контракт $
const address_usd= '0x0f18880a51C393AD95f853199781698F6e86dBDc';
const abi_usd = [    {        "constant": true,        "inputs": [],        "name": "name",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_spender",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "approve",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "totalSupply",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_from",                "type": "address"            },            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transferFrom",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "decimals",        "outputs": [            {                "name": "",                "type": "uint8"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            }        ],        "name": "balanceOf",        "outputs": [            {                "name": "balance",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": true,        "inputs": [],        "name": "symbol",        "outputs": [            {                "name": "",                "type": "string"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "constant": false,        "inputs": [            {                "name": "_to",                "type": "address"            },            {                "name": "_value",                "type": "uint256"            }        ],        "name": "transfer",        "outputs": [            {                "name": "",                "type": "bool"            }        ],        "payable": false,        "stateMutability": "nonpayable",        "type": "function"    },    {        "constant": true,        "inputs": [            {                "name": "_owner",                "type": "address"            },            {                "name": "_spender",                "type": "address"            }        ],        "name": "allowance",        "outputs": [            {                "name": "",                "type": "uint256"            }        ],        "payable": false,        "stateMutability": "view",        "type": "function"    },    {        "payable": true,        "stateMutability": "payable",        "type": "fallback"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "owner",                "type": "address"            },            {                "indexed": true,                "name": "spender",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Approval",        "type": "event"    },    {        "anonymous": false,        "inputs": [            {                "indexed": true,                "name": "from",                "type": "address"            },            {                "indexed": true,                "name": "to",                "type": "address"            },            {                "indexed": false,                "name": "value",                "type": "uint256"            }        ],        "name": "Transfer",        "type": "event"    }]
const contract_usd=new Contract(address_usd, abi_usd , provider); 
const daiContractWithSigner_usd = contract_usd.connect(signer);

// Апрув управления средствами $ для основного смартконтракта(sum(int) - кол-во $)

async function set_allowance_for_mint(sum) {
  let sum_last= number_to_bigNumber(sum,18)
  if (true){
    try {
        ok_ok = await daiContractWithSigner_usd.approve(address_pool,sum_last);
      } catch (err) {
        console.info('err in approve', err.message);
        return (false,err.message)
    }
    return (true,'200')
}

/////////////////////////// Функции основного смарта
/////////////////////////////////Изменение комиссии (poolID(int) - ID пула, quantity(int) - % новой комиссии)  
async function change_comission(poolID,quantity) {  
  try {
      await daiContractWithSigner_pool.change_commission(poolID,quantity);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  return (true,'200')
}

/////////////////////////////////Изменение пригласителя (user(str) - адрес пользователя, father(str) - адрес нового пригласителя)  
async function change_reffather(user,father) {  
  try {
      await daiContractWithSigner_pool.change_reffather(user,father);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  return (true,'200')
}

////////////////////////////////// получение poolID для создания нового пула, потом надо обращаться по этому ID ко всем функциям пула который будет создан по этому ID!

async function get_pool_id() {
 try{
  const pool_id = await contract_pool.pool_id();
  return (pool_id,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

///////////////////////////////// Создание пула, состоит из 2х транзакций в блокчейн
// pool_id(int) - poolID полученный от get_pool_id()
// strat_time(int) - Unix epoch time старта стекинга NFT
// green_time(int) - Unix epoch time старта инвестиций людей в зелёной зоне рейтинга
// yellow_time(int) - Unix epoch time старта инвестиций людей в желтой зоне рейтинга
// green_zone(int) - кол-во человек в зелёной зоне
// yellow_zone(int) - кол-во человек в желтой зоне
// nft_stake_need(int) - минимальное кол-во NFT для стекинга для участия
// max_invest(int) - сумма сбора пула
// name(str) - название пула
// min_invest_user(int) - максимальная инвестиция 1м юзером
// max_invest_user(int) - минимальная инвестиция 1м юзером
// comission(int) - % нашей комиссии 
// media_comission(int) - % комиссии медиа, должени быть меньше или равен чем comission + 2
// media(array of str) - массив адресов медиа может быть пуст [], пример: ["0x6E06e1561a436452ABc9Bb9552BC8C0A2D90bAB1","0x6E06e1561a436452ABc9Bb9552BC8C0A2D90bAB2"] 
async function create_pool(pool_id,strat_time,green_time,yellow_time,green_zone,yellow_zone,nft_stake_need,max_invest,name,min_invest_user,max_invest_user,comission,media_comission,media) {  
  try {
      await daiContractWithSigner_pool.createPrePool(strat_time,green_time,yellow_time,green_zone,yellow_zone,nft_stake_need);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  try {
      await daiContractWithSigner_pool.createPool(pool_id,number_to_bigNumber(max_invest,18),name,number_to_bigNumber(min_invest_user,18),number_to_bigNumber(max_invest_user,18),comission,media_comission,media);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  return (true,'200')
}


// Блокировка NFT для участия в пуле(poolID(int) - ID пула, quantity(int) - кол-во NFT)
async function stackeNFTprePool(poolID,quantity) {  
  try {
      await daiContractWithSigner_pool.stackeNFTprePool(poolID,quantity);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  return (true,'200')
}

// Инвестировать в пул 
// (amount(int) - кол-во $ перед ним нужен апрув на такую-же сумму + % комиссии(функция апрува расписана в этом доке уже с учётом комиссии),
// poolID - ID пула,
// refFather(str) - адрес пригласителя, если такого нет, то можно указать адрес админа)
async function Invest(amount,poolID,refFather) {  
  try {
      await daiContractWithSigner_pool.Invest(number_to_bigNumber(amount,18),poolID,refFather);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  return (true,'200')
}

// Блокировка NFT для участия в пуле(poolID(int) - ID пула, is_return(bool) - является ли это закрытие возвратом средств(true - возврат средств и закрытие пула, false - средства переводятся на аккаунт админа и пул завершается на ожидание внесения токенов))
async function end_pool_by_admin(poolID,is_return) {  
  try {
      await daiContractWithSigner_pool.end_pool_by_admin(poolID,is_return);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  return (true,'200')
}


// Добавить токены в пул для раздачи тем кто может сделать claim (addressT(str) - адрес Токена для клейма в сети,poolID - ID пула,sumT(int) - сумма токенов для клейма,decimals(int) - decimals самого токена,sum_invest(int) - сумма инвестиций в $)
async function change_endedPoolToken(addressT,poolID,sumT,decimals,sum_invest) {  
  try {
	  let changerate1 = Number(sumT/sum_invest.toFixed(4));  
	  changerate1 = changerate1 * 10000;
	  let changerate = number_to_bigNumber(changerate1,decimals-4) 
	  
    await daiContractWithSigner_pool.change_endedPoolToken(addressT,poolID,changerate);
  } catch (err) {
    console.info('err in transaction', err.message);
    
    return (false,err.message)
  }
  return (true,'200')
}

/////////////////////////////////Клейм токенов по NFT (NFT_ID(int) - ID NFT , можно получить через смартконтракт PoolNFT) так-же перед клеймом надо заапрувить эту NFT(функция апрува расписана в этом доке уже)  
async function Claim(NFT_ID) {  
  try {
      await daiContractWithSigner_pool.Claim(NFT_ID);
    } catch (err) {
      console.info('err in transaction', err.message);
      return (false,err.message)
  }
  return (true,'200')
}


//// Получить сведения о закрытом пуле с клеймом (poolID(int) - ID пула)
//// response (id - poolID, token(str) - адрес токена в котором пользователи будут производить клейм, claimstage(bool) - началась ли стадия клейма, changerate(BigNumber) - кол-во токенов в wei за 1$)
async function endedPools(poolID) {
 try{
  const response = await contract_pool.endedPools(poolID);

  const resData = {}

  resData.isClaim = response.clamstage
  resData.invest = bigNumber_to_number(response.changerate,decimals)
  resData.token = response.token

  return {response:resData}
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

//// Получить рейтинговую таблицу пула (poolID(int) - ID пула)
//// response (array of str[] - массив адресов упорядоченный по поинтам, array of int[] - массив поинтов соответствующий адресам.)
async function get_user_board(poolID) {
 try{
  const response = await contract_pool.get_user_board(poolID);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

//// может ли сейчас инвестировать юзер (poolID(int) - ID пула,user_adr(str) - адрес юзера)
//// response (bool)
async function get_user_can_invest(poolID,user_adr) {
 try{
  const response = await contract_pool.get_user_can_invest(poolID,user_adr);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}


//// Время инвестиций для юзера по его месту в таблице (poolID(int) - ID пула,user_adr(str) - адрес юзера)
//// response (int - начало времени инвестиций в Unix epoch time ,int - конец времени в Unix epoch time)
async function get_user_can_invest_time(poolID,user_adr) {
 try{
  const response = await contract_pool.get_user_can_invest_time(poolID,user_adr);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

//// В какой зоне инвестиций юзер (poolID(int) - ID пула,user_adr(str) - адрес юзера)
//// response (int) 1 = в зелёной зоне, 2 = в желтой зоне, 0 = не может инвестировать
async function get_user_in_zone(poolID,user_adr) {
 try{
  const response = await contract_pool.get_user_in_zone(poolID,user_adr);

  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);

  return (0,err.message)
 }
}

//// На каком месте юзер в массиве юзеров (user_adr(str) - адрес юзера,array_adr(array of string) - массив адресов)
//// response (int)
async function get_user_place_in_arr(user_adr,array_adr) {
 try{
  const response = await contract_pool.get_user_place_in_arr(user_adr,array_adr);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

//// Сколько NFT застакал(заблокировал) юзер (poolID(int) - ID пула,user_adr(str) - адрес юзера)
//// response (int)
async function get_user_stacked_NFT_count(poolID,user_adr) {
 try{
  const response = await contract_pool.get_user_stacked_NFT_count(poolID,user_adr);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}


//// Получить всех Инвесторов пула(poolID(int) - ID пула)
//// response array of tuple
//// tuple(str - адрес инвестора, BigNumber - кол-во $ инвестированых в wei, int - PoolNFT_ID которое выдали пользователю за инвестиции, int - всегда 0)
async function getAllPartnersFromPool(poolID) {
 try{
  const response = await contract_pool.getAllPartnersFromPool(poolID);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}


//// Информация о poolNFT (poolNFT_ID(int) - ID NFT), эта информация создаётся только по удачно завершенному пулу иначе все параметры будут 0
//// response (int - ID пула к которой относится NFT, BigNumber - кол-во $ инвестированых в wei, str - адрес того кто инвестировал )
async function getInfobyNFT(poolNFT_ID) {
 try{
  const response = await contract_pool.getInfobyNFT(poolNFT_ID);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}


//// Получить меня как Инвесторов пула(poolID(int) - ID пула,,user_adr(str) - адрес юзера)
//// response tuple
//// tuple(str - адрес инвестора, BigNumber - кол-во $ инвестированых в wei, int - PoolNFT_ID которое выдали пользователю за инвестиции, int - всегда 0)
async function getMeInPool(poolID) {
 try{
  const response = await contract_pool.getMeInPool(poolID,user_adr);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

//// Количество поинтов юзера полученіе за участия в пулах (user_adr(str) - адрес юзера)
//// response (int) 

async function get_user_in_zone(poolID,user_adr) {
 try{
  const response = await contract_pool.R_points(user_adr);
  return (response,'200')
 }
 catch (err) {
  console.info('err', err.message);
  return (0,err.message)
 }
}

//// Получить пригласителя юзера (user_adr(str) - адрес юзера)
//// response (str) 

async function refFather(poolID,user_adr) {
  try{
    const response = await contract_pool.refFather(user_adr);
    return (response,'200')
  }
  catch (err) {
     console.info('err', err.message);
     return (0,err.message)
  }
  }
}