import { useState,useEffect } from 'react'
import { timePassedFrom } from '../../../../../utils/timePassedFrom'
import sliceAddress from '../../../../../utils/sliceAddress'
import fetchNftActivity from '../../../../../services/fetchNftActivity'
import styles from './activity.module.scss'

export default function Activity({nft}) {
  const [activity,setActivity] = useState([])

  useEffect(() => {
    fetchNftActivity(nft.smart,nft.nftSmartId).then(({success,histories}) => {
      if(success){
        setActivity(histories)
      }
    })
  },[])

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <div className={styles.headItem}>
          Event
        </div>
        <div className={styles.headItem}>
          Price
        </div>
        <div className={styles.headItem}>
          From
        </div>
        <div className={styles.headItem}>
          To
        </div>
        <div className={styles.headItem}>
          Date
        </div>
      </div>
      <div className={styles.table}>
        {
          activity?.length
          ?
          activity.reverse().map((item,index) => {
            return (
              <div 
              key={index}
              className={styles.tableItemWrapper}>
              <div 
              className={styles.tableItem}>
                <div className={styles.tableValue}>
                  transfer
                </div>
                <div className={styles.tableValue}>
                  {item.price} {item.currency}
                </div>
                <div className={styles.tableValue}>
                  {sliceAddress(item.from)}
                </div>
                <div className={styles.tableValue}>
                  {sliceAddress(item.to)}
                </div>
                <div className={styles.tableValue}>
                  {timePassedFrom(new Date(item.date))} ago
                </div>
              </div>
              <hr className='line' /> 
              </div>
            )
          })
          :
          <div className={styles.empty}>
           Empty list...
          </div>
        }
      </div>
    </div>
  )
}
