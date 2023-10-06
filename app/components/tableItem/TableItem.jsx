import { Claim } from '../../smart/initialSmartMain'
import setIsClaim from '../../utils/setIsClaim'
import updateUser from '../../services/updateUser'
import checkIsClaim from '../../utils/checkIsClaim'
import parseDate from '../../utils/parseDate'
import changeDateType from '../../utils/changeDateType'
import styles from '../styles/table-item.module.scss'

export default function TableItem({item}) {

  const confirmClaim = async () => {
    const {success} = await Claim(item.poolId,window.ethereum.selectedAddress)
    if(success){
      const claimData = setIsClaim(item)
      await updateUser(claimData)
    }
  } 

  return (
    <div className={styles.item}>
      <div className={styles.body}>
          <span className={styles.bold}>{item.title}</span>
          <span className={styles.bold}>{item.investments || 0}$</span>
          <div className={styles.statys}>
            {
            item.isClaim
            ?
            <span className={styles.unlocked}>Unlocked</span>
            :
            <span className={styles.locked}>Locked</span>
            }
          </div>
          <span>${item.investments}</span>
          <span>{item.claimed}</span>
          <div className={styles.mobileDates}>
            <span className={styles.mobileDate}>{changeDateType(parseDate(item.greenTime))} {item.greenTimeStart}</span>
            <span className={styles.mobileDate}>{changeDateType(parseDate(item.distributionStart))} {item.claimTimeStart}</span>
          </div>
          <span className={styles.date}>{changeDateType(parseDate(item.greenTime))} {item.greenTimeStart}</span>
          <span className={styles.date}>{changeDateType(parseDate(item.distributionStart))} {item.claimTimeStart}</span>
          <button 
          onClick={confirmClaim}
          disabled={!item.isClaim || checkIsClaim(item._id)}
          className={
            checkIsClaim(item._id)
            ?
            styles.btn + " " + styles.claimed
            :
            styles.btn
          }>
            {
              checkIsClaim(item._id)
              ?
              'Claimed'
              :
              'Claim'
              
            }
            </button>
      </div>
      <hr className={styles.line}/>
    </div>
  )
}
