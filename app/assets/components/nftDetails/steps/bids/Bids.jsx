import { useState } from 'react'
import Image from 'next/image'
import arrowRotateSvg from '../../../../icons/arrow-rotate.svg'
import styles from './bids.module.scss'

const bidsInitialState = [
  {
    price:'20.001 ETH',
    floor:'29% below floor',
    by:`B4debf`,
    expiry:`in 1 minute`,
  },
  {
    price:'20.001 ETH',
    floor:'29% below floor',
    by:`B4debf`,
    expiry:`in 1 minute`,
  },
  {
    price:'20.001 ETH',
    floor:'29% below floor',
    by:`B4debf`,
    expiry:`in 1 minute`,
  },
  {
    price:'20.001 ETH',
    floor:'29% below floor',
    by:`B4debf`,
    expiry:`in 1 minute`,
  },
]

export default function Bids({nft}) {
  const [isSortOpen,setIsSortOpen] = useState(false)
  const [sortValue,setSortValue] = useState('Total Raised')

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <span>Sort by:</span>
        <button
        onClick={() => setIsSortOpen((prev) => !prev)}
        className={styles.sortBtn}
        >
          {sortValue}
          {
            isSortOpen
            ?
            <Image 
            className={styles.rotate}
            src={arrowRotateSvg} 
            alt='arrow'
            />
            :
            <Image 
            src={arrowRotateSvg} 
            alt='arrow'
            />
          }

        </button>
      </div>
      <div className={styles.items}>
          {
            bidsInitialState.map((item,index) => {
              return (
                <div
                key={index}
                className={styles.item}
                >
                  <div className={styles.itemRow}>
                    <span className={styles.value}>
                      {item.price}
                    </span>
                    <span className={styles.key}>
                      {item.floor}
                    </span>
                  </div>
                  <div className={styles.itemRow}>
                    <div className={styles.by}>
                      <span className={styles.key}>By</span>
                      <span className={styles.value}>
                        {item.by}
                      </span>
                    </div>
                    <span className={styles.key}>
                      Expiry: {item.expiry}
                    </span>
                  </div>
                  <hr className='line'/>
                </div>
              )
            })
          }
      </div>
    </div>
  )
}
