import { useState } from "react"
import newCollection from "../services/collectionsServices/newCollection"
import CreateCollection from "../components/createCollection/CreateCollection"
import CollectionsList from "../components/collectionsList/CollectionsList"
import CustomLoader from '../../assets/components/loader/Loader'
import styles from '../styles/collections.module.scss'

export default function Collections({collectionsInitial}) {
    const [loading,setLoading] = useState(false)
    const [collections,setCollections] = useState(collectionsInitial)

    const addCollection = async (collectionData) => {
      setLoading(true)

      const {success,collection} = await newCollection(
        {...collectionData,project:collectionData.project._id})

      setLoading(false) 

      window.location.reload()
    }

    if(loading) {
      return <CustomLoader/>
    }

  return (
    <div className={styles.body}>
        <div className={styles.title}>
         <h1>Collections</h1>
        </div>
        <div className={styles.collections}>
          <CollectionsList collections={collections}/>
        </div>
        <div className={styles.addCollection}>
            <CreateCollection
            addCollection={addCollection}
            />
        </div>
    </div>
  )
}
