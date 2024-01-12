import { useMemo, useState } from 'react'
import { deleteCollectionFromSmart, changeFee} from '../../../smart/initialSmartNftMarket'
import pinCollection from '../../services/collectionsServices/pinCollection'
import deleteCollection from '../../services/collectionsServices/deleteCollection'
import updateCollection from '../../services/collectionsServices/updateCollection'
import Collection from '../collection/Collection'
import useProjects from '../../../hooks/useProjects'
import TextField from '../../../components/UI/inputs/TextField'
import styles from '../../styles/collections-list.module.scss'

export default function CollectionsList({collections}) {
    const [colletionsData,setCollectionsData] = useState(collections)
    const [searchValue,setSearchValue] = useState('')
    const {allProjects} = useProjects({})

    const removeCollection = async (collectionToRemove) => {
        const {success} = await deleteCollectionFromSmart(collectionToRemove.smart)

        if(!success){
            alert('Smart contract error')
            return
        }

        setCollectionsData((prev) => {
            return (
                prev.filter((collection) => {
                    return collectionToRemove._id !== collection._id
                })
            )
        })

        await deleteCollection(collectionToRemove._id)
    }

    const editCollection = async (id,collectionToEdit,projectId) => {
        setCollectionsData((prev) => {
            return (
                prev.map((collection) => {
                    if(collectionToEdit._id !== id){
                        return {...collection,...collectionToEdit}
                    }
                    return collection
                })
            )
        })

        await updateCollection(id,{...collectionToEdit,project:projectId})
    }

    const pinHandler = async (collectionToPin) => {
        await pinCollection(collectionToPin._id,!collectionToPin.isPinned)

        setCollectionsData((prev) => {
            return (
                prev.map((collection) => {
                    if(collection._id === collectionToPin._id){
                        return {...collection,isPinned:!collection.isPinned}
                    }
                    return collection
                })
            )
        })
    }

    const filteredCollections = useMemo(() => {
        return colletionsData.filter((collection) => {
            return collection.title.toLowerCase().includes(searchValue.toLowerCase())
        })
    },[searchValue,colletionsData])
    
  return (
    <div className={styles.body}>
        <div className={styles.search}>
            <div className={styles.title}>
                Search by title:
            </div>
            <div className={styles.searchWrapper}>
                <TextField
                value={searchValue}
                handler={(e) => setSearchValue(e.target.value)}
                />
            </div>
        </div>
        {
            filteredCollections?.length 
            ?
            filteredCollections.map((collection) => {
                return (
                    <Collection 
                    projects={allProjects}
                    pinHandler={pinHandler}
                    removeCollection={removeCollection}
                    editCollection={editCollection}
                    collection={collection}
                    key={collection._id}
                    />
                )
            })
            :
            <></>
        }
    </div>
  )
}
