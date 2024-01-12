import Lottie from 'lottie-react'
import RefundAnim from '../../lotties-animations/refund.json'
import styles from './info.module.scss'

export const RefundInfo = () => {
  return (
    <div className={styles.body}>
        <div className={styles.anim}>
            <Lottie animationData={RefundAnim}></Lottie>
        </div>
        <div className={styles.text}>
            REFUNDED
        </div>
    </div>
  )
}
