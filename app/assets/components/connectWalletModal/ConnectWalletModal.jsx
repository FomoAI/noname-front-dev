import styles from './connect.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import Image from 'next/image'
import lockSvg from '../../icons/lock.svg'

export default function ConnectWalletModal({closes,openWallet}) {
  return (
    <>
    <div className={styles.modalBody}>
    <div className={styles.modalImg}>
        <Image src={lockSvg} alt={'lock'}/>
    </div>
    <div className={styles.modalInfo}>
        <div className={styles.modalTitle}>
            Connect your wallet to participate
        </div>
        <div className={styles.modalCloses}>
            <span className={styles.modalKey}>Contribution Closes</span>
            <span className={styles.modalBlueText}>{`${closes.days}d ${closes.hours}h ${closes.minutes}m`}</span>
        </div>
    </div>
    </div>
    <div>
        <SquareBtn type='red' handler={openWallet} btnId='none' text={'Connect wallet'} width={'328'}/>
    </div>
    </>
  )
}
