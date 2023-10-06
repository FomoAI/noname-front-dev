import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './wallets.module.scss'
import closeSvg from '../../icons/close.svg'
import arrowSvg from '../../icons/wallets/wl-arrow.svg'
import Image from 'next/image'
import { Web3Modal } from "@web3modal/react";
import { ethereumClient } from '../../../config/provider'
import { wallets } from '../../../config/wallets'
import { closeModal ,toggleModal,toggleModalWithoutBlock} from '../../../store/slices/modalsSlice';
import CheckBox from '../../../components/UI/inputs/CheckBox';

export default function Wallets({config,isVisible,handler,connect}) {
  const [isConfirm,setIsConfirm] = useState(false)
  const dispatch = useDispatch()
  const bodyClass = isVisible ? styles.wlModal + " " + styles.visible : styles.wlModal

  const modalsHandler = (id) => {
    if(id === 'close-modal'){
      dispatch(closeModal('wallet'))
    }

    if(id === 'terms' || id === 'policy'){
      dispatch(closeModal('wallet'))
      window.scroll(0,window.document.body.scrollHeight)
    }

  }

  return (
        <div 
        id='close-modal'
        onClick={(e) => modalsHandler(e.target.id)}
        className={bodyClass}>
          <div className={styles.body}>
          <div className={styles.row}>
            <div className={styles.head}>
            <div className={styles.title}>
               Connect wallet
             </div>
             <div className={styles.description}>
             Start by connecting with one of the wallet below
             </div>
            </div>
             
             <div className={styles.close}>
               <button onClick={handler}><Image alt={'close-modal'} src={closeSvg}/></button>
             </div>
          </div>
          <div className={styles.wallets}>
            {wallets.map((wl,index) => {
              return (
                <button 
                disabled={!isConfirm}
                onClick={() => isConfirm && connect(wl.config,wl.title)} 
                key={wl.title} 
                className={!isConfirm ? styles.wallet + ' ' + styles.disabled : styles.wallet}>
                  <div className={styles.wlImg}>
                    <Image src={wl.img} alt={wl.title}/>
                  </div>
                  <div className={styles.wlTitle}>
                    {wl.title}
                  </div>
                  <div className={styles.wlArrow}>
                    <Image src={arrowSvg} alt={index}/>
                  </div>
                </button>
              )
            })}
          </div>
          <div className={styles.confirm}>
              <CheckBox
              handler={setIsConfirm}
              isChecked={isConfirm}
              />
              <div className={styles.confirmText}>
              I have read, understand and agree to 
              No name Disclaimer as well as <span id='terms' tabIndex={1}>Terms of Service</span> and 
              <span id='policy' tabIndex={2}> Privacy Policy</span>
              </div>
          </div>
          </div>
          {
            config?.desktop
            ?
            <Web3Modal
            mobileWallets={config.mobile}
            desktopWallets={config.desktop}
            ethereumClient={ethereumClient}
            projectId={'c3aa2dd660a1a5a1922e0dbdfc712912'}
            >
            </Web3Modal>
            :
            <Web3Modal
            ethereumClient={ethereumClient}
            projectId={'c3aa2dd660a1a5a1922e0dbdfc712912'}
            >
            </Web3Modal>
          }

        </div>
  )
}
