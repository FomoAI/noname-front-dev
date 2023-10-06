import sliceAddress from '../../../utils/sliceAddress'
import styles from './my-score.module.scss'

const checkStatus = (status) => {
    if(status === 'green'){
        return (
            <div className={styles.pass}></div>
        )
    }
    if(status === 'yellow'){
        return (
        <div className={styles.potentialWrapper}>
            <div className={styles.potential}></div>
        </div>
        )
    }
    if(status === 'red'){
        return (
            <div className={styles.nopass}></div>
        )
    }
}

export default function MyScore({userData}) {

  return (
    <div>       
        <div className={styles.title}>
            My score
        </div>
        <div className={styles.table}>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Rank:
                </div>
                <div className={styles.value}>
                    {userData.rank || '-'}
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Address:
                </div>
                <div className={styles.value}>
                    {sliceAddress(userData.address)}
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Projects participated:
                </div>
                <div className={styles.value}>
                    {userData?.projects?.length || 0}
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Total score:
                </div>
                <div className={styles.value}>
                    {userData.totalScore || '-'}
                </div>
            </div>
            <div className={styles.tableItem}>
                <div className={styles.key}>
                    Status:
                </div>
                <div className={styles.value}>
                    {checkStatus(userData.status) || checkStatus('red')}
                </div>
            </div>
        </div>
    </div>
  ) 
}
