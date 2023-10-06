import useModal from '../../hooks/useModal'
import WaitingItem from '../../assets/components/waitingListItem/WaitingItem'
import styles from '../styles/waiting-list.module.scss'
import WaitingRemove from '../../assets/components/waitingRemove/WaitingRemove'

export default function WaitingList(
  {
    user,
    items,
    removeItem,
    type
  }) {

  return (  
    <>
    <div className={styles.list}>
        <div className={styles.head}>
            <span>Project</span>
            <span>Status</span>
            <span className={styles.hide}>Funding Goal</span>
            <span className={styles.hide}>Funded</span>
            <span className={styles.hide}>Last Funding</span>
            <span className={styles.hide}>Type</span>
            <span>Rating</span>
        </div>
        {
          user.isAuth
          ?
          <div className={styles.body}>
            {
            items?.length
            ?
            items.map((item,index) => {
                return (
                  <WaitingItem 
                  type={type}
                  key={index} 
                  remove={removeItem} 
                  item={item}
                  />
                )
            })
            :
            <div className={styles.message}>
              <h1>Waiting list is empty...</h1>
            </div>
            }
          </div>  
          :
          <div className={styles.message}>
            <h1>Please add wallet to use waiting list...</h1>
          </div>
        }
    </div>
    </>   
  )
}
