import styles from './leader-item.module.scss'
import sliceAddress from '../../../utils/sliceAddress'

export default function LeaderboardItem({item}) {

  return (
    <>
    <div className={styles.body}>
        <div className={styles.bold}>
            {item.rank}
        </div>
        <div className={styles.value}>
            {sliceAddress(item.address)}
        </div>
        <div className={styles.value}>
            {item.totalScore}
        </div>
    </div>
    <div className={styles.line}>

    </div>
    </>
  )
}
