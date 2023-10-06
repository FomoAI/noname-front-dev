import { useRef, useState } from 'react'
import Collection from '../collection/Collection'
import styles from '../styles/collections.module.scss'

export default function Collections({collections}) {
  const [maxCollections,setMaxCollections] = useState(5)

  const showMoreCollections = () => {
    setMaxCollections(collections.length)
  }

  return (
    <div className={styles.body}>
        {
            collections.slice(0,maxCollections).map((collection,index) => {
                return (
                    <Collection collection={collection} key={collection._id}/>
                )
            })
        }
        {
          collections.length >= maxCollections
          ?
          <div className={styles.moreBtnWrapper}>
          <button onClick={showMoreCollections} className={styles.moreBtn}>
              More {'>'}
          </button>
          </div>
          :
          <></>
        }

    </div>
  )
}
