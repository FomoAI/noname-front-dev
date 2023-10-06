import styles from './complete-modal.module.scss'
import Image from 'next/image'
import completeSvg from '../../icons/complete.svg'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'

export default function CompleteModal({closes,handler}) {
    
  return (
    <>
    <div className={styles.modalBody}>
        <div className={styles.modalImg}>
            <Image src={completeSvg} alt={'complete'}/>
        </div>
        <div className={styles.modalInfo}>
            <div className={styles.modalTitle}>
              Complete KYC to participate
            </div>
            <div className={styles.modalCloses}>
                <span className={styles.modalKey}>Contribution Closes</span>
                <span className={styles.modalBlueText}>{`${closes.days}d ${closes.hours}h ${closes.minutes}m`}</span>
            </div>
        </div>
        </div>
        <ul className={styles.modalRules}>
            <li className={styles.modalRulesItem}>
                This sale requires you to pass KYC.
            </li>
            <li className={styles.modalRulesItem}>
                Your Noname NFT is tied to the connected wallet you use during KYC.
            </li>
            <li className={styles.modalRulesItem}>
                You must stake your Noname NFT to proceed with the KYC. 
            </li>
            <li className={styles.modalRulesItem}>
                You can only use a wallet that has passed KYC to participate and claim. 
            </li>
        </ul>
        <SquareBtn type='red' handler={handler} btnId={'next'} text={'Verify'} width={'328'}/>
    </>
  )
}







