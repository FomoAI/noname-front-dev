import { useState , useRef,} from 'react';
import { useRouter } from 'next/router';
import { useSelector , useDispatch} from 'react-redux';
import Image from 'next/image';
import styles from './styles/header.module.scss'
import Nav from '../nav/Nav';
import useTimer from '../../hooks/useTimer'
import AccessToNonameDao from '../../assets/components/AccessNonameDao/AccessToNonameDao';
import closeSvg from '../../assets/icons/close-gray.svg'
import { toggleModal } from '../../store/slices/modalsSlice';

const bannerInitialState = {
    message:'Deals closing soon!',
    date:'28.02.2024',
    time:'24:00',
    linkName:'View closing soon',
    href:'https://no-name.io'
}

const Header = ({headerData}) => {
    const [banner,setBanner] = useState(true)
    const {userData} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const bannerRef = useRef(null)
    const time = useTimer(
        headerData.date ? headerData.date : bannerInitialState.date,
        headerData.time ? headerData.time : bannerInitialState.time
    )

    const hideBanner = () => {
        setBanner(false) 
        setTimeout(() => {
            bannerRef.current.style.display = 'none'
        },400)
    }

    const checkAuthAndNavigate = () => {
        if(!userData.isAuth){
            dispatch(toggleModal('wallet'))
            return
        }

        // if(!userData.isNftAccess){
        //     dispatch(toggleModal('nonameDao'))
        //     return
        // }

        router.replace(headerData.href)

    }
    
    return (
        <header className={styles.header}>
            {
                headerData?.bannerVisible
                ?
                <div
                ref={bannerRef} 
                className={banner ? styles.banner : styles.banner + ' ' + 'hide-banner'}>
                    <div className={styles.message}>
                        {headerData.message}
                    </div>
                    <div className={styles.timer}>
                        <div className={styles.time}>
                            <span>{time.days ? time.days : '0'}d</span>
                            <span>{time.hours ? time.hours : '0'}h</span>
                            <span>{time.minutes ? time.minutes : '0'}m</span>
                            <span>{time.seconds ? time.seconds : '0'}s</span>
                        </div>
                        <div className={styles.info}>
                            left to invest in {time.days ? time.days : '0'} days
                        </div>
                    </div>
                    <div className={styles.linkBody}>
                        <button
                        className={styles.projectLink}
                        onClick={checkAuthAndNavigate}
                        >
                            {headerData.linkName}
                        </button>
                        <button onClick={hideBanner} className={styles.close}>
                            <Image src={closeSvg} alt='close'/>
                        </button>
                    </div>
                </div>
                :
                <></>
            }
  
            <div className={styles.rows}>
                <div className={styles.row}>
                        <div className={styles.rowItem}>
                            <span className={styles.textLight}>Total Investment:</span>  
                            <span className={styles.textWhite}>1.98 T USD</span>  
                        </div>
                        <div className={styles.rowItem}>
                            <a href={headerData.link} className={styles.textWhite}>{headerData.name}</a>  
                        </div>
                </div>
            </div>
            <Nav userData={userData}/>
        </header>
    );
}


export default Header;
