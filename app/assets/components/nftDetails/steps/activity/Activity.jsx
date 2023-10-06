import styles from './activity.module.scss'

const tableInitalState = [
  {
    event:'transfer',
    price:'10.55 ETH',
    from:'0x4545f...',
    to:'0x4545f...',
    date:'4 days ago',
  },
  {
    event:'transfer',
    price:'10.55 ETH',
    from:'0x4545f...',
    to:'0x4545f...',
    date:'4 days ago',
  },
  {
    event:'transfer',
    price:'10.55 ETH',
    from:'0x4545f...',
    to:'0x4545f...',
    date:'4 days ago',
  },
  {
    event:'transfer',
    price:'10.55 ETH',
    from:'0x4545f...',
    to:'0x4545f...',
    date:'4 days ago',
  },
  {
    event:'transfer',
    price:'10.55 ETH',
    from:'0x4545f...',
    to:'0x4545f...',
    date:'4 days ago',
  },
  {
    event:'transfer',
    price:'10.55 ETH',
    from:'0x4545f...',
    to:'0x4545f...',
    date:'4 days ago',
  },
  {
    event:'transfer',
    price:'10.55 ETH',
    from:'0x4545f...',
    to:'0x4545f...',
    date:'4 days ago',
  },
]

export default function Activity({nft}) {
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
          tableInitalState.map((item,index) => {
            return (
              <div 
              key={index}
              className={styles.tableItemWrapper}>
              <div 
              className={styles.tableItem}>
                <div className={styles.tableValue}>
                  {item.event}
                </div>
                <div className={styles.tableValue}>
                  {item.price}
                </div>
                <div className={styles.tableValue}>
                  {item.from}
                </div>
                <div className={styles.tableValue}>
                  {item.to}
                </div>
                <div className={styles.tableValue}>
                  {item.date}
                </div>
              </div>
              <hr className='line' /> 
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
