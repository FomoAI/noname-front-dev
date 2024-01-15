import sliceAddress from '../../../utils/sliceAddress'
import styles from './leader-item.module.scss'

export default function LeaderboardItem({index,item}) {

  return (
    <>
    <div className={styles.body}>
        <div className={styles.bold}>
            {index + 1}
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
