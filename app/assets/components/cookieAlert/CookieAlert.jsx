import { useDispatch , useSelector} from 'react-redux'
import styles from './cookie.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import SquareBlueBtn from '../../../components/UI/buttons/SquareBlueBtn'
import CookieTools from '../../../utils/cookieTools'
import blockScroll from '../../../utils/blockScroll'
import { closeModal } from '../../../store/slices/modalsSlice'

export default function CookieAlert({type = 'default'}) {
    const dispatch = useDispatch()
    const modalState = useSelector((state) => state.modals.cookie.state)

    const acceptCookie = () => {
        CookieTools.set('nonameVisit',true,365)
        blockScroll()
        dispatch(closeModal('cookie'))
    }
    
    const rejectCookie = () => {
        blockScroll()
        dispatch(closeModal('cookie'))
    }


    if(type === 'main'){
        return (
            modalState
            ?
            <div className={styles.modal}>
                <div className={styles.body}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            We use cookies
                        </div>
                        <div className={styles.text}>
                        We use cookies to personalize content and ads, to provide social media features and to analyze our traffic.
                        <br/>
                        By clicking "Accept all" you agree 
                        that Noname you may store cookies on your 
                        device and disclose information in accordance 
                        with our Cookie Policy.
                        </div>
                    </div>
                    <div className={styles.btns}>
                      <SquareBlueBtn 
                      handler={rejectCookie} 
                      text={'Reject'} 
                      height='48' 
                      width='270'
                      />
                      <SquareBlueBtn 
                      handler={acceptCookie} 
                      text={'Accept all'} 
                      type='blue' 
                      height='48' 
                      width='270'
                      />
                    </div>
                </div>
            </div>
            :
            <></>
        )
    }

  return (
        modalState
        ?
        <div className={styles.modal}>
        <div className={styles.body}>
        <div className={styles.info}>
            <div className={styles.title}>
                We use cookies
            </div>
            <div className={styles.text}>
            We use cookies to personalize content and ads, to provide social media features and to analyze our traffic.
            <br/>
            By clicking "Accept all" you agree 
            that Noname you may store cookies on your 
            device and disclose information in accordance 
            with our Cookie Policy.
            </div>
        </div>
        <div className={styles.btns}>
          <SquareBtn 
          handler={rejectCookie} 
          text={'Reject'} 
          height='48' 
          width='270'
          />
          <SquareBtn 
          handler={acceptCookie} 
          text={'Accept all'} 
          type='red' 
          height='48' 
          width='270'
          />
        </div>
        </div>
        </div>
        :
        <></>

  )
}

