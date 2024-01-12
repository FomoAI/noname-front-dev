import { useState , useMemo , useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/img/logo-beta.svg'
import cartSvg from '../../assets/icons/cart.svg'
import PinkBtn from '../UI/buttons/PinkBtn';
import Wallets from '../../assets/components/wallets/Wallets'
import Burger from '../../assets/components/burger/Burger';
import MobileNav from '../../assets/components/mobileNav/MobileNav';
import blockScroll from '../../utils/blockScroll';
import UserSettings from '../userSettings/UserSettings'
import { useWeb3Modal } from "@web3modal/react";
import { useDispatch , useSelector} from 'react-redux'
import { useAccount} from 'wagmi'
import useCart from '../../hooks/useCart';
import {setUserData} from '../../store/slices/authSlice' 
import useWallet from '../../hooks/useWallet';
import useAuth from '../../hooks/useAuth';
import { closeModal, closeModalWithoutBlock, openModal, toggleModal ,toggleModalWithoutBlock} from '../../store/slices/modalsSlice';
import SearchBar from '../../assets/components/searchBar/SearchBar';
import NavModal from '../../assets/components/navModal/NavModal';
import CartModal from '../../assets/components/cartModal/CartModal'
import LoaderCustom from '../../assets/components/loader/Loader';
import SuccessWalletConnect from '../../assets/components/SuccessWalletConnect/SuccessWalletConnect';
import AccessToNonameDao from '../../assets/components/AccessNonameDao/AccessToNonameDao';
import RwaCreditModal from '../../assets/components/rwaCreditNavModal/RwaCreditModal'
import styles from '../layout/styles/nav.module.scss'

const links = [
    {
        title:'NFT Market',
        href:'/marketplace'
    },
    {
        title:'RWA & Credit',
        isBtn:true,
    },
    {
        title:'Leaderboard',
        href:'/leaderboard'
    },
    {
        title:'Dashboard',
        href:'/dashboard'
    },
    {
        title:'Blog',
        href:'/blog'
    },
    {
        title:'Vote',
        href:'/vote'
    },
    {
        title:'Calendar',
        href:'/calendar'
    },

    {
        title:'Waitlist',
        href:'/waitinglist'
    },
]

const mobileLinks = [
    {
        title:'NFT Marketplace',
        href:'/marketplace'
    },
    {
        title:'RWA & Credit',
        isBtn:true,
    },
    {
        title:'Leaderboard',
        href:'/leaderboard'
    },
    {
        title:'Dashboard',
        href:'/dashboard'
    },
    {
        title:'Blog',
        href:'/blog'
    },
    {
        title:'Vote',
        href:'/vote'
    },
    {
        title:'Calendar',
        href:'/calendar'
    },
    {
        title:'Waiting list',
        href:'/waitinglist'
    },
    {
        title:'NN Info',
        href:'/info'
    },
]

const Nav = ({userData}) => {
    const walletState = useSelector((state) => state.modals.wallet.state)
    const navModalState = useSelector((state) => state.modals.nav.state)
    const rwaModalState = useSelector((state) => state.modals.rwa.state)
    const [modal,setModal] = useState(false)
    const [config,setConfig] = useState({})
    const {loading,connectWallet} = useWallet()
    const {open} = useWeb3Modal();
    const dispatch = useDispatch()
    const {changeAccount} = useAuth()
    const {cart} = useCart()

    const disconnectHandler = () => {
        dispatch(setUserData({address:'',balance:'',isAuth:false}))
        dispatch(closeModal('settings'))
    }

    const { address, isConnected ,status} = useAccount({onConnect:changeAccount,onDisconnect:disconnectHandler})

    const checkDiscord = (user) => {
        return user?.discordData
        && 
        localStorage.getItem('connectWalletStep') === '4'
    }

    const walletsHandler = (event) => {
        event && event.preventDefault()

        const user = JSON.parse(localStorage.getItem('userData')) 

        const isThirdStep = checkDiscord(user)
        
        const isSecondStep = 
        user?.address?.length 
        && 
        localStorage.getItem('connectWalletStep') === '1'

        !isSecondStep && !isThirdStep && dispatch(toggleModal('wallet'))

        isSecondStep && dispatch(openModal('successConnect'))

        isThirdStep && dispatch(openModal('successConnect'))

    }

    const connect = async (config,wallet) => {
      if(wallet === 'Connect Wallet'){
        setConfig(config)
        open()
      }

      if(wallet === 'Metamask'){
        if(!window?.ethereum?.isMetaMask){
            setConfig(config)
            open()
            return
        }
        await connectWallet('Metamask',walletsHandler)

        return
      }
      if(wallet === 'TrustWallet'){
        if(!window?.ethereum?.isTrustWallet){
            setConfig(config)
            open()
            return
        }
        await connectWallet('TrustWallet',walletsHandler)
      }
    }

    const modalHandler = (event) => {
        event.stopPropagation()
        if(event.target.id === 'remove-block'){
            blockScroll('remove')
        }
        if(event.target.id === 'brg-btn' || event.target.id === 'modal'){
            walletState && walletsHandler()
            setModal(!modal)
            dispatch(closeModal('settings'))
            dispatch(closeModal('nav'))
        }
    }

    const rwaModalHandler = () => {
        dispatch(closeModalWithoutBlock('nav'))
        dispatch(toggleModalWithoutBlock('rwa'))
    }
    const navModalHandler = () => {
        dispatch(closeModalWithoutBlock('rwa'))
        dispatch(toggleModalWithoutBlock('nav'))
    }

    useEffect(() => {
        if(isConnected){
            walletsHandler(false)
            localStorage.setItem('connectWalletStep','1')
            setTimeout(() => {
                dispatch(openModal('successConnect'))
              },100)  
        }
    },[isConnected])

    const isDiscordConnected = useMemo(() =>{
        return checkDiscord(userData)
    },[userData])
   
    if(loading){
        return <LoaderCustom/>
    }

    return (
        <>
        <div onClick={modalHandler} className={styles.row}>
            <div className={styles.logo}>
                <Link href={'/'}>
                   <Image width={'160'} src={logo} alt='logo'/>
                </Link>
            </div>
            <div className={styles.infoLink}>
                <Link href={'/info'}>
                    NN info
                </Link>
            </div>
            <div className={styles.input}>
                <SearchBar/>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.links}>
                <li className={styles.investsBtn}>
                    <button 
                    className={navModalState ? styles.rotate : 'none'}
                    onClick={navModalHandler}>
                        Invest
                    </button>
                    <NavModal isVisible={navModalState}/>
                </li>
                {links.map((link,index) => {
                    if(link?.isBtn){
                        return (
                            <li className={styles.secondBtn} key={index}>
                               <button 
                               onClick={rwaModalHandler}   
                                className={rwaModalState ? styles.rotate : 'none'}
                                >
                                    {link.title}
                                </button>
                                <RwaCreditModal isVisible={rwaModalState} handler={rwaModalHandler}/>
                            </li>
                        )
                    }
                    if(link.href === '/waitinglist' && userData._id){
                        return (
                            <li key={index}>
                                <Link 
                                className={styles.link} 
                                href={`${link.href}/${userData._id}`}>
                                    {link.title}
                                </Link>
                            </li>
                        )
                    }

                    return (
                        <li key={index}>
                            <Link 
                            className={styles.link} 
                            href={`${link.href}`}>
                                {link.title}
                            </Link>
                        </li>
                    )
                })}
                </ul>
            </nav>
            <div className={styles.btn}>
                {
                    userData.isAuth
                    ?
                    <UserSettings user={userData} disconnect={disconnectHandler}/>
                    :
                    <PinkBtn 
                    handler={walletsHandler} 
                    text={isDiscordConnected ? 'Login to No Name' : 'Connect wallet'} 
                    href={''} 
                    id={'wallet-btn'}
                    />
                }
            </div>
            <button
            onClick={() => dispatch(openModal('cart'))}
            className={styles.cartBtn}
            >
                <Image src={cartSvg} alt='cart'/>
                <div className={styles.cartCount}>
                    {cart.length}
                </div>
            </button>
            <Wallets 
            config={config} 
            connect={connect} 
            handler={walletsHandler} 
            isVisible={walletState}
            />
            <Burger/>
            <MobileNav 
            navModalHandler={navModalHandler}
            rwaModalHandler={rwaModalHandler}
            navModalState={navModalState}
            rwaModalState={rwaModalState}
            disconnect={disconnectHandler} 
            user={userData} 
            isAuth={userData.isAuth} 
            walletsHandler={walletsHandler} 
            isVisible={modal} 
            modalHandler={modalHandler} 
            links={mobileLinks}
            />
            <SuccessWalletConnect userData={userData}/>
            <CartModal/>
        </div>
        </>
    );
}

export default Nav;
