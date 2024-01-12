import { useState , useRef, useMemo, useEffect,useContext} from 'react'
import { useRouter } from 'next/router'
import { Transition } from 'react-transition-group'
import { useSelector , useDispatch} from 'react-redux'
import { ethers } from "ethers";
import { openModal, toggleModalWithoutBlock } from '../../store/slices/modalsSlice'
import {
  getNoNameNFTBalance,
  getNoNameNFTStakedBalance, 
  getUserClaimValue,
  getLeaderBoardData,
  getPoolInfo,
  Claim,
  awardsAmount
} from '../../smart/initialSmartMain'
import { chainIdValue, decimals } from '../../config/provider';
import { LayoutContext } from '../layout';
import getUserPartners from '../../services/getUserPartners'
import useProjects from '../../hooks/useProjects';
import addClaimToUser from '../../utils/addClaimToUser'
import checkIsClaim from '../../utils/checkIsClaim'
import icons from '../../assets/icons/user/user'
import Image from 'next/image'
import Lottie from 'lottie-react'
import bookSvg from '../../assets/icons/book.svg'
import KYCsvg from '../../assets/icons/user/kyc.svg'
import walletSvg from '../../assets/icons/wallet.svg'
import supportSvg from '../../assets/icons/user/support.svg'
import discordSvg from '../../assets/icons/discordBlue.svg'
import cartSvg from '../../assets/icons/user/cart.svg'
import KYCModal from '../../assets/components/KYCModal/KYCModal'
import MultichainModal from '../../assets/components/multichainwallets/MultichainModal'
import SupportModal from '../../assets/components/supportModal/SupportModal'
import SwitchModal from '../../assets/components/switchModal/SwitchModal'
import copyText from '../../utils/copyText'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import MenuCloseAnim from '../../assets/lotties-animations/menu.json'
import sliceAddress from '../../utils/sliceAddress'
import createRefLink from '../../utils/createRefLink'
import getUserById from '../../services/getUserById';
import styles from '../styles/user-settings.module.scss'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getStatus() {
  try{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const chainId = await provider.getNetwork()
   if (chainId.chainId!=chainIdValue){
     return true
   }
  } catch (err) {
   await sleep(4000);
   return false
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
          decimals: decimals
      },
      blockExplorerUrls: ["https://explorer.zksync.io/"]
    }]
});
console.log('Chain',result)

}

async function get_ETH_balance() {
  try{
 
   const provider = new ethers.providers.Web3Provider(window.ethereum);  
   if (window.ethereum.selectedAddress == null){
     await sleep(4000);
     return 1
   }

   let balance = await provider.getBalance(window.ethereum.selectedAddress)
    // convert a currency unit from wei to ether
   const ds = ethers.utils.formatEther(balance)

   return ds
  }
  catch (err) {
   console.info('err in get_ETH_balance', err.message);
   await sleep(4000);
   return 1
 }
}

export default function UserSettings({disconnect,user}) {
  const [KYCmodal,setKYCmodal] = useState(false)
  const [multichain,setMultiChain] = useState(false)
  const [support,setSupport] = useState(false)
  const [success,setSuccess] = useState(false)
  const [refCoppied,setRefCoppied] = useState(false)
  const [isCustomAlert,setIsCustomAlert] = useState(false)
  const [isSuccessClaim,setSuccessClaim] = useState(false)
  const [open_switchModal, setOpen_switchModal] = useState(false)
  const [currentProject,setCurrentProject] = useState()
  const {allProjects} = useProjects({})
  const layoutData = useContext(LayoutContext)
  const router = useRouter()
  
  const state = useSelector((state) => state.modals.settings.state)
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const nodeRef = useRef(null)
  const refLinkInput = useRef(null)

  const [NFT_bougt,setNFT_bougt] = useState(0)
  const [NFT_partners,setNFT_partners] = useState(0)
  const [NFT_award,setNFT_award] = useState(0)
  const [nftStaked,setNftStaked] = useState(0)
  const [claimValue,setClaimValue] = useState(0)
  const [totalScore,setTotalScore] = useState(0)
  const [ETHbalance,setETHbalance] = useState(1)
  const [claimData,setClaimData] = useState(null)
  const [isClaimed,setIsClaimed] = useState(0)

  const transitionStyles = {
    entering: { opacity: 1 ,visibility:'visible'},
    entered:  { opacity: 1 ,visibility:'visible'},
    exiting:  { opacity: 0 ,visibility:'hidden'},
    exited:  { opacity: 0 ,visibility:'hidden'},
  };
  const rotateStyles = {
    entering: {transform: 'rotate(180deg)'},
    entered:  {transform: 'rotate(180deg)' },
    exiting:  {transform: 'rotate(0deg)' },
    exited:   {transform: 'rotate(0deg)' },
  }

  const KYCmodalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      setKYCmodal((state) => !state)
      setSuccess(false)
    }
  }

  const walletsModalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      setMultiChain((state) => !state)
      setSuccess(false)
    }
  }

  const supportModalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
      setSupport((state) => !state)
      setSuccess(false)
    }
  }

  const copyRef = (node) => {
    setRefCoppied(true)
    setIsCustomAlert(true)
    copyText(refLinkInput.current)
  }

  const switchModalHandler= (event) => {
    if(typeof event !== 'string' && event.target.id === 'toggle-modal'){
      event.stopPropagation()
      setOpen_switchModal(false)
      return
    }

    if(event == 'active_switch') {

      changeNetwork().then(result => setOpen_switchModal(false))
      setOpen_switchModal(false)
      return
    }
  }

  const confirmClaim = async () => {
    if(!claimData) return
    
    const {success} = await Claim(claimData.poolId,claimData.address)
    if(success){
      setSuccessClaim(success)
      setIsClaimed(success)
      await addClaimToUser(currentProject)
    }
  }
  
  useMemo(() => {
    if(refCoppied){
      setTimeout(() => {
        setRefCoppied(false)
      },3500)
    }
  },[refCoppied])
  
  useEffect(() => {
    const getIsClaimed = async () => {
      const isClaimedValue = await checkIsClaim(currentProject?._id)
   
      setIsClaimed(isClaimedValue?.isAlreadyClaim)
    }

    getIsClaimed()
  },[currentProject])

  useEffect(() => {
    if(!allProjects?.length) return 
    
    const project = allProjects.find((pr) => {
      return pr?.isMainProject
    })

    setCurrentProject(project)

    getStatus().then(result => setOpen_switchModal(result))

    getNoNameNFTStakedBalance(window.ethereum.selectedAddress).then(({sum}) => {
      setNftStaked(Number(sum))
    })

    getNoNameNFTBalance(window.ethereum.selectedAddress).then(({sum}) => {
      setNFT_bougt(Number(sum))
    })

    if(project){
      getUserClaimValue(project.poolId,window.ethereum.selectedAddress,project._id).then(({success,claimValue,isClaim}) => {
        if(isClaim){
          setClaimValue(claimValue)
          setClaimData({address:window.ethereum.selectedAddress,poolId:project.poolId})
        }
      })
  
      getLeaderBoardData(project.poolId).then(({userData}) => {
        setTotalScore(userData?.totalScore || 0)
      })
    }

    getUserPartners(window.ethereum.selectedAddress).then(({success,item}) => {
      if(success && item?.referrals){
        setNFT_partners(item.referrals.length)
      }
    })

    awardsAmount(window.ethereum.selectedAddress).then(({success,awards}) => {
      setNFT_award(awards)
    })

    get_ETH_balance().then(result => {
        setETHbalance(Number(result))})
  },[allProjects])

  return (
    <>
    <div className={styles.modalBody}>
      <Transition in={state} timeout={1000}>
      {(state) => {
        return(
          <div onClick={() => dispatch(toggleModalWithoutBlock('settings'))} className={styles.button}>
            <div className={styles.photo}>
              {
                       user?.discordData?.avatar
                       ?
                       <Image
                       alt='user-img'
                       width={'24'}
                       height={'24'}
                       loader={() => `https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       src={`https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       />
                       :
                      <Image src={icons.photo} alt={'user-photo'}/>     
              }
            </div>
            <span className={styles.username}>
            {
            user?.address 
            ? 
            user.address 
            : 
            'Username'
            }
            </span>
            <div style={{...rotateStyles[state]}} className={styles.arrow}>
              <Image src={icons.arrow} alt={'arrow'}/>
            </div>
          </div>
        )
      }}
      </Transition>
      <Transition in={state} timeout={1000}>
      {
        (state) => {
          return (
            <div id='toggle-modal' style={{...transitionStyles[state]}} ref={nodeRef} className={styles.modal}>
                <div className={styles.userInfo}>
                  <div className={styles.usernameInfo}>
                    <div className={styles.modalPhoto}>
                      {
                       user?.discordData?.avatar
                       ?
                       <Image
                       width={'24'}
                       height={'24'}
                       alt='user-img'
                       loader={() => `https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       src={`https://cdn.discordapp.com/avatars/${user.discordData.id}/${user.discordData.avatar}?size=24`}
                       />
                       :
                      <Image src={icons.photo} alt={'user-photo'}/>     
                      }    
                    </div>
                    <span className={styles.username}>
                      {
                      user?.address 
                      ?
                      sliceAddress(user.address,'2x4') 
                      : 
                      'Username'
                      }
                    </span>
                  </div>
                  <button 
                  className={styles.closeBtn} 
                  onClick={() => dispatch(toggleModalWithoutBlock('settings'))}>
                    {/* <Image src={closeSvg} alt='close-modal'/> */}
                    <Lottie animationData={MenuCloseAnim}/>
                  </button>
                </div>
        <div className={styles.row}>
         <span className={styles.key}>
           Partners:
         </span>
         <span className={styles.value}>
			 {NFT_partners}
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Balance:
         </span>
         <span className={styles.value}>
         {ETHbalance}
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Awards:
         </span>
         <span className={styles.value}>
			    {NFT_award}
         </span>
        </div>
        <div className={styles.row}>
         <span className={styles.key}>
         Score:
         </span>
         <span className={styles.value}>
          {totalScore}
         </span>
        </div>

        <div className={styles.btns}>
        <div className={styles.row}>
           <button onClick={() => dispatch(openModal('cart'))} className={styles.btn}>
              <Image alt={'cart'} src={cartSvg}/>
              <span>Cart</span>
           </button>
           <span className={styles.value}>{cart.length}</span>
        </div>
        <div className={styles.row}>
           <button className={styles.btn}>
              <Image alt={'stale'} src={icons.stake}/>
              <span>Stake</span>
           </button>
           <span className={styles.value}>{nftStaked}</span>
        </div>
        <div className={styles.row}>
           <button 
           onClick={() => confirmClaim()}
           className={styles.btn}>
              <Image alt={'claim'} src={icons.claim}/>
              <span>Claim</span>
           </button>
           <span className={styles.value}>{
           isClaimed
            ?
            0
            :
           claimValue || 0
           }</span>
        </div>
        <div className={styles.row}>
           <button className={styles.btn}>
              <Image alt={'nft'} src={icons.nft}/>
              <span>NFT</span>
           </button>
           <span className={styles.value}>{NFT_bougt}</span>
        </div>
        <div className={styles.row}>
           <button onClick={copyRef} className={styles.btn}>
              <Image alt={'copy'} src={icons.copy}/>
              <span>Copy referall link</span>
              <input ref={refLinkInput} defaultValue={createRefLink(user._id)} className={styles.hiddenInput}/>
              {
                refCoppied
                ?
                <span className={styles.copied}>Copied</span>
                :
                ''
              }
           </button>
        </div>
        <div className={styles.row}>
           <button 
            onClick={() => router.push('/academy')}
           className={styles.btn + ' ' + styles.academy}>
              <Image alt={'NN Academy'} src={bookSvg}/>
              <span>NN Academy</span>
           </button>
        </div>
        <div className={styles.row}>
           <button 
            onClick={() => router.push(layoutData?.footer?.shillClubLink)}
           className={styles.btn + ' ' + styles.academy}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.5 1.99935C1.5 0.986829 2.32081 0.166016 3.33333 0.166016H10C11.0125 0.166016 11.8333 0.986829 11.8333 1.99935V7.66602C11.8333 7.94215 11.6095 8.16602 11.3333 8.16602C11.0572 8.16602 10.8333 7.94215 10.8333 7.66602V1.99935C10.8333 1.53911 10.4603 1.16602 10 1.16602H3.33333C2.87309 1.16602 2.5 1.53911 2.5 1.99935V13.9994C2.5 14.4596 2.87309 14.8327 3.33333 14.8327H9.33334C9.60947 14.8327 9.83334 15.0566 9.83334 15.3327C9.83334 15.6088 9.60947 15.8327 9.33334 15.8327H3.33333C2.32081 15.8327 1.5 15.0119 1.5 13.9994V1.99935Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M3.57467 0.40315C3.66578 0.255742 3.82671 0.166016 4 0.166016H9.33333C9.5066 0.166016 9.66753 0.255742 9.75867 0.40315C9.84973 0.550558 9.85807 0.734629 9.78053 0.889622L9.29813 1.85443C9.10053 2.24968 8.69653 2.49935 8.25467 2.49935H5.07869C4.63679 2.49935 4.23281 2.24968 4.03519 1.85443L3.55279 0.889622C3.47529 0.734629 3.48357 0.550558 3.57467 0.40315ZM4.80902 1.16602L4.92962 1.40722C4.95785 1.46368 5.01556 1.49935 5.07869 1.49935H8.25467C8.3178 1.49935 8.37547 1.46368 8.40373 1.40722L8.52433 1.16602H4.80902Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4.83301 13.332C4.83301 13.0559 5.05687 12.832 5.33301 12.832H7.99968C8.27581 12.832 8.49968 13.0559 8.49968 13.332C8.49968 13.6082 8.27581 13.832 7.99968 13.832H5.33301C5.05687 13.832 4.83301 13.6082 4.83301 13.332Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.5 9.9987C9.5 9.35436 10.0223 8.83203 10.6667 8.83203H13.3333C13.6095 8.83203 13.8333 9.0559 13.8333 9.33203V12.6654C13.8333 12.9415 13.6095 13.1654 13.3333 13.1654H10.6667C10.0223 13.1654 9.5 12.643 9.5 11.9987V9.9987ZM10.6667 9.83203C10.5746 9.83203 10.5 9.90663 10.5 9.9987V11.9987C10.5 12.0908 10.5746 12.1654 10.6667 12.1654H12.8333V9.83203H10.6667Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.6253 8.2604C15.7557 8.35434 15.833 8.50527 15.833 8.666V13.3327C15.833 13.4934 15.7557 13.6443 15.6253 13.7383C15.495 13.8323 15.3273 13.8579 15.1749 13.807L13.1749 13.1403C12.9707 13.0723 12.833 12.8812 12.833 12.666V9.33267C12.833 9.11747 12.9707 8.9264 13.1749 8.85834L15.1749 8.19167C15.3273 8.14087 15.495 8.1664 15.6253 8.2604ZM13.833 9.69307V12.3056L14.833 12.6389V9.35974L13.833 9.69307Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.842 12.1918C12.104 12.1045 12.3871 12.2461 12.4745 12.508L13.1411 14.508C13.2285 14.77 13.0869 15.0531 12.8249 15.1405C12.5629 15.2278 12.2798 15.0862 12.1925 14.8243L11.5258 12.8243C11.4385 12.5623 11.5801 12.2791 11.842 12.1918Z" fill="black"/>
              </svg>
              <span>Shill club</span>
           </button>
        </div>
        <div className={styles.row}>
           <button onClick={() => setMultiChain((state) => !state)} className={styles.btn}>
              <Image alt={'connect'} src={walletSvg}/>
              <span>Multi-chain wallet</span>
           </button>
        </div>
        <div className={styles.row}>
           <button onClick={() => setKYCmodal((state) => !state)} className={styles.btn + ' ' + styles.kyc}>
              <Image alt={'connect email'} src={KYCsvg}/>
              <span>KYC (email)</span>
           </button>
        </div>
        <div className={styles.row}>
           <button onClick={() => setSupport((state) => !state)} className={styles.btn + ' ' + styles.kyc}>
              <Image alt={'connect'} src={supportSvg}/>
              <span>Support</span>
           </button>
        </div>
        <div className={styles.row}>
           <button 
           onClick={() => router.push('https://discord.com/api/oauth2/authorize?client_id=1082648354053427210&redirect_uri=https%3A%2F%2Fnoname-backend-production.up.railway.app%2Fdiscord&response_type=code&scope=identify')} className={styles.btn}>
              <Image alt={'discord'} src={discordSvg}/>
              <span className={styles.blueText}>
                {user?.discordData?.username ? user?.discordData?.username : 'Connect Discord'}
              </span>
           </button>
        </div>
        </div>
        <div className={styles.logout}>
          <button onClick={disconnect} type={'button'}>Log out</button>
        </div>
        {
          NFT_bougt === 0
          ?
          <div className={styles.nftError}>
            <Image src={icons.nftError} alt='Buy nft'/>
            <span>To gain a full access buy NONAME NFT!</span>
          </div>
          :
          <></>
        }

      </div>
          )
        }
      }
      </Transition>
    </div>
    <KYCModal 
    userEmail={user.KYC}
    success={success} 
    setSuccess={setSuccess} 
    isVisible={KYCmodal} 
    handler={KYCmodalHandler}/>

    <MultichainModal
    success={success}
    setSuccess={setSuccess}
    userWallets={user.multichainwallets}
    handler={walletsModalHandler}
    isVisible={multichain}
    />
    <SupportModal
    user={user}
    handler={supportModalHandler}
    success={success}
    setSuccess={setSuccess}
    isVisible={support}
    />
    <CustomAlert
    isAutoClose={true}
    position='left'
    type={'success'}
    title={'Сopied!'}
    text={`You have successfully copied a referral link`}
    isVisible={isCustomAlert}
    handler={() => setIsCustomAlert(false)}
    />
    <CustomAlert
    isAutoClose={true}
    position='left'
    type={'success'}
    title={'Claimed!'}
    text={`You have successfully claim your tokens`}
    isVisible={isSuccessClaim}
    handler={() => setSuccessClaim(false)}
    />
    <SwitchModal handler={switchModalHandler} isVisible={open_switchModal}/>
    </>
  
  )
}
