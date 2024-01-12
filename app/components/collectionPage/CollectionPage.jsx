import { useMemo, useState, useEffect } from 'react'
import { getCollectionData } from '../../smart/initialSmartNftMarket'
import { useSelector,useDispatch } from 'react-redux'
import { setCurrency } from '../../store/slices/currencySlice'
import LoaderCustom from '../../assets/components/loader/Loader'
import getNftByCollectionId from '../../services/getNftsByCollectionId'
import CollectionInfo from '../../assets/components/collectionInfo/CollectionInfo'
import NftSearchBar from '../../assets/components/nftSearchBar/NftSearchBar'
import NftFilter from '../../assets/components/nftFilter/NftFilter'
import SmartCopy from '../../assets/components/smartContractCopy/SmartCopy'
import Nft from '../../components/nft/Nft'
import CurrencyCheckbox from '../../assets/components/currencyCheckbox/CurrencyCheckbox'
import styles from '../styles/collection-page.module.scss'      

export default function CollectionNftsPage({data,isNftPage,ethExchange}) {
    const [loading,setLoading] = useState(false)
    const [nfts,setNfts] = useState(data.nfts)
    const [nftsValue,setNftsValue] = useState(16)
    const [isMaxNfts,setIsMaxNfts] = useState(data?.nfts.length < 16)
    const [searchValue,setSearchValue] = useState('')
    const [collectionData,setCollectionData] = useState({})
    const [filters,setFilters] = useState({
        rarity:{
            min:0,
            max:100
        },
        price:{
            min:0,
            max:150
        },
        share:{
            min:0,
            max:100
        },
        rank:''
    })    
    const dispatch = useDispatch()
    const currenyItems = useSelector((state) => state.currency.currencyArray)
    const currency = useSelector((state) => state.currency.currencyArray)?.find((item) => item.isSelected)

    const filterHandler = (name,value) => {
        setFilters((prev) => {
            return {...prev,[name]:value}
        })
    }

    const searchHandler = (value) => {
        setSearchValue(value)
    }

    const changeCurrency = () => {
        dispatch(setCurrency())
    }

    const filterNfts = (nfts,filters) => {
        const filterResult = nfts.filter((nft) => {
            const isValid = [];
          
            isValid.push(nft.rarity >= filters.rarity.min && nft.rarity <= filters.rarity.max) 

            if(currency.name === 'ETH'){
                isValid.push(nft.priceEth >= filters.price.min && nft.priceEth <= filters.price.max) 
            }else{
                isValid.push(nft.priceUsdc >= filters.price.min && nft.priceUsdc <= filters.price.max) 
            }

            isValid.push(nft.share >= filters.share.min && nft.share <= filters.share.max)

            if(filters.rank){
                for (let i = 0; i < nft.attributes.length; i++) {
                    const attribute = nft.attributes[i]
                    if(attribute.trait_type === 'rarity'){
                        isValid.push(attribute.value.toLowerCase() === filters.rank.toLowerCase()) 
                    }
                }
            }

            return isValid.every((value) => value)
        })

        return filterResult
    }

    const showMoreNfts = async () => {        
        const {nftsData} = await getNftByCollectionId(data._id,nftsValue,nftsValue + 16)
        
        setIsMaxNfts((nftsValue + 16) > [...nftsData,...nfts].length)

        setNfts([...nfts,...nftsData])
        
        setNftsValue((prev) => prev += 16)
    }

    const filteredAndFindedNfts = useMemo(() => {
        const findedNfts = nfts.filter((nft) => {
            return nft.name.toLowerCase().includes(searchValue.toLowerCase())
        })
    
        const filteredNfts = filterNfts(findedNfts,filters)

        return filteredNfts
    },[filters,searchValue,nfts])

    useEffect(() => {
        setLoading(true)

        getCollectionData(data.smart,currency.name,ethExchange,data).then((collectionData) => {
            if(isNftPage){
                let price
                data.priceUsdc > 0
                ?
                price = Number(data.priceUsdc)
                : 
                price = Number(ethExchange) * Number(data.priceEth)
                setCollectionData({...collectionData,nftPrice:price})

            }else{
                setCollectionData(collectionData)
            }
            setLoading(false)
            
        })

    },[])

    if(loading) return <LoaderCustom/>

  return (
    <div className={styles.body}>
        <CollectionInfo 
        nftId={data.nftId}
        isNftPage={isNftPage}
        collectionData={{...data,...collectionData,ethExchange}}
        />
        <div className={styles.actionsRow}>
                <div className={styles.filterAndSort}>
                    <CurrencyCheckbox
                    hanlder={changeCurrency}
                    items={currenyItems}
                    />
                    <NftFilter
                    handler={filterHandler}
                    />
                    <NftSearchBar
                    value={searchValue}
                    handler={searchHandler}
                    />
                </div>
                <div className={styles.smartAndOrder}>
                    <SmartCopy address={data.smart}/>
                </div>
        </div>
        <div className={styles.nfts}>
            {
                filteredAndFindedNfts.length
                ?
                filteredAndFindedNfts.map((nft) => {
                    return (
                        <Nft 
                        key={nft._id} 
                        nft={{...nft,tokenAddress:data.smart}}
                        />
                    )
                })
                :
                <div className={styles.notFounded}>
                    Nothing found...
                </div>
            }
        </div>
        {
            isMaxNfts
            ?
            <>
            </>
            :
            <div className={styles.moreBtnWrapper}>
                <button onClick={showMoreNfts} className={styles.moreBtn}>
                    More {'>'}
                </button>
            </div>
        }

    </div>
  )
}
