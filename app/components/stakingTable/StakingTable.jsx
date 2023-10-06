import styles from '../styles/staking-table.module.scss'
import TableItem from '../tableItem/TableItem'

export default function StakingTable({items,height='343',boxShadow = '4px 4px 10px #eeeeee'}) {
  return (
    items?.length 
    ?
    <div style={{boxShadow:boxShadow}} className={styles.table}>
      <div className={styles.head}>
        <span>Project</span>
        <span>Your investment</span>
        <span>Status</span>
        <span>Locked</span>
        <span>Claimed</span>
        <span>Invest Date</span>
        <span>Unlock Date</span>
        <span>Action</span>
      </div>
      <div  style={{height:`${height}px`}} className={styles.body}>
        {
        items.map((item,index) => {
            return <TableItem key={index} item={item}/>
        })
        }
      </div>
    </div>
    :
    <></>
  )
}
