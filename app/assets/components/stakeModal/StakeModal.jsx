import styles from './stake-modal.module.scss'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import RangeInput from '../customRangeInput/RangeInput'
import { useState } from 'react'

export default function StakeModal() {
    const [stakeValue,setStakeValue] = useState('')

  return (
    <div className={styles.body}>
        <div className={styles.row}>
            <div className={styles.info}>
            Amet minim mollit non deserunt ullamco 
            est sit aliqua dolor do amet sint. 
            Velit officia consequat duis enim velit mollit.
            </div>
        </div>
        <div className={styles.maxBlock}>
            <input
            onChange={(e) => setStakeValue(e.target.value)}
            value={stakeValue}
            type="text" />
            <span className={styles.max}>Max</span>
        </div>
        <div className={styles.wallet}>
            <span className={styles.key}>
                Wallet: 0 BREED
            </span> 
        </div>
        <SquareBtn type='red' text={'Approve'} width={'328'}/>
    </div>
  )
}
