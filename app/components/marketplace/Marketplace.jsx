import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../../store/slices/currencySlice'
import { toggleModal } from '../../store/slices/modalsSlice'
import CurrencyCheckbox from '../../assets/components/currencyCheckbox/CurrencyCheckbox'
import Image from 'next/image'
import Info from '../../assets/components/info/Info'
import CollectionsFilter from '../../assets/components/collectionsFilter/CollectionsFilter'
import Collections from '../collections/Collections'
import ListForSale from '../../assets/components/ListForSale/ListForSale'
import listForSaleSvg from '../../assets/icons/listForSale.svg'
import styles from '../styles/marketplace.module.scss'

export default function Marketplace({collectionsData}) {
    const [collections,setCollection] = useState(collectionsData)
    const listForSaleVisible = useSelector((state) => state.modals.listForSale.state)
    const currenyItems = useSelector((state) => state.currency.currencyArray)
    const dispatch = useDispatch() 

    const filterCollections = (filterValue) => {
        if(filterValue === 'all'){
            setCollection(collectionsData)

            return
        }

        const filteredCollections = collectionsData.filter((collection) => {
            return collection.type === filterValue
        })

        setCollection(filteredCollections)
    }

    const changeCurrency = () => {
        dispatch(setCurrency())
    }

    const modalHandler = (event) => {
        if(event.target.id === 'toggle-modal'){
            dispatch(toggleModal('listForSale'))
        }
    }

  return (
    <>
    <div className={styles.body}>
        <Info
        title={'NFT Market'}
        />
        <div className={styles.subTitle}>
        NFTs marketplace for zkSync projects where you can buy/sell your NFT.
        </div>
        <div className={styles.description}>
        No name has developed its own NFT Marketplace so you can easily trade your NFTs. 
        You no longer have  to look for other places to trade. No name has everything 
        you need for comfortable investing and dealing with your assets. 
        </div>
        <div className={styles.collectionsWrapper}>
            <div className={styles.head}>
                <CollectionsFilter
                handleFilterChange={filterCollections}
                />
                <button 
                onClick={() => dispatch(toggleModal('listForSale'))} 
                className={styles.listBtn}>
                    <span>List for sale</span>
                    <Image src={listForSaleSvg} alt='list for sale'/>
                </button>
            </div>
            <div className={styles.currencySelect}>
                <CurrencyCheckbox
                items={currenyItems}
                hanlder={changeCurrency}
                />
            </div>
            <div className={styles.collections}>
                {
                    collections.length 
                    ?
                    <Collections collections={collections}/>
                    :
                    <div className={styles.notFound}>
                    Not found collections with current filter...
                    </div>
                }
            </div>
        </div>
    </div>
    <ListForSale 
    collections={collectionsData}
    isVisible={listForSaleVisible} 
    handler={modalHandler}
    />
    </>
  )
}
