import { useMemo, useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../store/slices/modalsSlice'
import { 
    getUserNfts, createOrder, getOrderByNftId, 
    createOrderUsd,getOrderUsdByNftId,approveNFT,
    getFloorPriceUsdc,getFloorPriceEth
} from '../../../smart/initialSmartNftMarket'
import { bigNumber_to_number, numberToBigNumber } from '../../../smart/initialSmartMain'
import { getCurrentDecimal } from '../../../smart/initialSmartMain'
import getFloorPrice from '../../../services/getFloorPrice'
import addDateAndTime from '../../../utils/addDateAndTime'
import parseDate from '.././../../utils/parseDate'
import Image from 'next/image'
import Modal from '../modal/Modal'
import CustomCalendar from '../calendar/Calendar'
import CustomAlert from '../CustomAlert/CustomAlert'
import ApproveCollection from './ApproveCollection'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import CheckBox from '../../../components/UI/inputs/CheckBox'
import TimeInput from '../timeInput/TimeInput'
import arrowSvg from '../../../assets/icons/arrow-rotate.svg'
import SearchList from '../searchList/SearchList'
import getNftsByName from '../../../services/getNftsByName'
import loader from '../../../utils/loader'
import listNft from '../../../services/listNft'
import getUserData from '../../../utils/getUserData'
import styles from './list-for-sale.module.scss'

const currencyList = [
    'ETH',
    'USDC'
]

const timeList = [
    '24H',
    '7D',
    '1M',
    '3M',
    '1Y'
]

export default function ListForSale({collections,isVisible,handler}) {
    const [allNfts,setAllNfts] = useState([])
    const [loading,setLoading] = useState(false)
    const [selectedCollection,setSelectedCollection] = useState(null)
    const [selectedNft,setSelectedNft] = useState(null)
    const [collectionSearchValue,setCollectionSearchValue] = useState('')
    const [nftSearchValue,setNftSearchValue] = useState('')
    
    const [date,setDate] = useState(new Date().toLocaleDateString())
    const [time,setTime] = useState({hours:'',minutes:''})
    const [duration,setDuration] = useState('7D')
    const [currency,setCurrency] = useState('ETH')
    const [floorPrice,setFloorPrice] = useState(false)
    const [floorPriceValue,setFloorPriceValue] = useState(0)
    const [price,setPrice] = useState(0)

    const [isCurrencyList,setIsCurrencyList] = useState(false)
    const [isSuccessApprove,setIsSuccessApprove] = useState(false)
    const [isDurationList,setIsDurationList] = useState(false)
    const [isApproveCollection,setIsApproveCollection] = useState(false)
    const [isCustomAlert,setIsCustomAlert] = useState(false)

    const dispatch = useDispatch()

    const validateData = () => {
        return !selectedNft || !price || !time.hours || !time.minutes
    }

    const floorPriceHandler = () => {
        if(!floorPrice && selectedCollection){
            setPrice(floorPriceValue)
        }else{
            setPrice(0)
        }

        setFloorPrice((prev) => !prev)
    }

    const changeCurrency = (value) => {
        setCurrency(value)
        setIsCurrencyList(false)
    }

    const completeListing = () => {
        setIsApproveCollection(true)
    }

    const approveCollectionHandler = async () => {
        const {currentNumber,currentDecimals} = getCurrentDecimal(price)

        const timeEnd = addDateAndTime(parseDate(date),`${time.hours}:${time.minutes}`)
        const nftId = selectedNft.nftId
        const tokenAddress = selectedCollection.smart
        const priceBigNumber = numberToBigNumber(currentNumber,currentDecimals)
        const creatorId = getUserData()?._id
        
        if(currency === 'ETH'){
            await approveNFT(tokenAddress,nftId)

            const {success} = await createOrder(timeEnd,nftId,tokenAddress,priceBigNumber)

            if(!success) return
            
            await listNft(nftId,{isListingEth:true,priceEth:Number(price),creatorId,collectionAddress:tokenAddress})
        }

        if(currency === 'USDC'){
            await approveNFT(tokenAddress,nftId)

            const {success} = await createOrderUsd(timeEnd,nftId,tokenAddress,priceBigNumber)
            
            if(!success) return
            
            await listNft(nftId,{isListingUsdc:true,priceUsdc:Number(price),creatorId,collectionAddress:tokenAddress})
        }

        dispatch(closeModal('listForSale'))
        setIsSuccessApprove(true)
        setIsCustomAlert(true)
        setTime({hours:'',minutes:''})
        setDate(new Date().toLocaleDateString())
        setAllNfts([])
        setSelectedCollection(null)
        setPrice(0)
        
        setTimeout(() => {
            setSelectedNft(null)
            setIsApproveCollection(false)
        },[1000])
    }

    const selectCollection = (collection) => {
        setCollectionSearchValue('')
        setSelectedCollection(collection)
    }

    const removeCollection = () => {
        setSelectedCollection(null)
        setSelectedNft(null)
    }

    const selectNft = (nft) => {
        setNftSearchValue('')
        setSelectedNft(nft)
    }

    const filteredCollections = useMemo(() => {
        return collections.filter((collection) => {
            return collection.title.toLowerCase().includes(collectionSearchValue.toLowerCase())
        })
    },[collectionSearchValue])

    useEffect(() => {
        if(!selectedCollection || !window.ethereum.selectedAddress) return

        getUserNfts(selectedCollection.smart,window.ethereum.selectedAddress).then(({success,nftsData}) => {
            setAllNfts(nftsData)
        })
        
    },[selectedCollection])

    useMemo(() => {
        if(!selectedCollection || !selectedNft || !window.ethereum.selectedAddress) return
        
        getFloorPrice(selectedCollection.smart,selectedNft.nftId,currency).then(({floorPrice}) => {
            setFloorPriceValue(floorPrice)
            setPrice(floorPrice)
        })

    },[currency,selectedCollection,selectedNft])

  return (
    <>
    <Modal 
    transform='translateX(3px)'
    overflowY='auto'
    width={
        isApproveCollection
        ?
        '440'
        :
        '362'
    }
    title={isApproveCollection ? 'Approve collection' : 'List for sale'}
    isVisible={isVisible} 
    handler={handler}> 
    {
        isApproveCollection
        ?
        <ApproveCollection
        nft={selectedNft}
        />
        :
        <div className={styles.body}>
        <div className={styles.inputs}>
            <SearchList
            label={'Collection:'} 
            inputLabel={'Collection name'}
            btnHandler={removeCollection}
            items={filteredCollections}
            selected={selectedCollection} 
            selectHandler={selectCollection}
            searchValue={collectionSearchValue}
            inputHandler={(value) => setCollectionSearchValue(value)}
            />
            {
                selectedCollection
                ?
                <SearchList 
                type='nfts'
                loading={loading}
                label={'Nft:'}
                inputLabel={'Nft name'}
                btnHandler={() => setSelectedNft('')}
                items={allNfts}
                selected={selectedNft} 
                selectHandler={selectNft}
                searchValue={nftSearchValue}
                inputHandler={(value) => setNftSearchValue(value)}
                />
                :
                <></>
            }
        </div>
        <div className={styles.price}>
            <div className={styles.key}>
                Set a price
            </div>
            <div className={styles.floorPrice}>
                <div className={styles.floorPriceLabel}>
                Floor price: {
                selectedCollection
                ?
                    currency === 'ETH'
                    ? 
                    `${floorPriceValue} ETH` 
                    : 
                    `${floorPriceValue} USDC`
                :
                    0
                }
                </div>
            <CheckBox
            id='none'
            handler={floorPriceHandler}
            isChecked={floorPrice}
            />
            </div>
        </div>
        <div className={styles.yourPrice}>
            <div className={styles.inputWrapper}>
                <label 
                className={styles.label}
                htmlFor='collection-name'>
                Your price
                </label>
                <input 
                value={price}
                type='number'
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
                placeholder='0.0'
                id='collection-name'/>
            </div>
            <div className={styles.currencyWrapper}>
                <button 
                onClick={() => setIsCurrencyList((prev) => !prev)}
                className={styles.selectedCurrency}>
                    {currency}
                    {
                        isCurrencyList
                        ?
                        <Image 
                        className={styles.rotate}
                        src={arrowSvg} alt='arrow'/>
                        :
                        <Image src={arrowSvg} alt='arrow'/>
                    }
                </button>
                <div className={
                    isCurrencyList
                    ?
                    styles.currencyList + ' ' + styles.visible
                    :
                    styles.currencyList
                    }>
                    {
                        currencyList.map((currency) => {
                            return (
                            <button 
                            onClick={() => changeCurrency(currency)}
                            className={styles.currencyBtn}
                            key={currency}>
                                {currency}
                            </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className={styles.duration}>
            <div className={styles.key}>
            Duration
            </div>
            <div className={
                isDurationList
                ?
                styles.durationInputs + ' ' + styles.visible
                :
                styles.durationInputs
            }>
                <CustomCalendar
                range={false}
                dates={date}
                name={'date'}
                stateHandler={(name,date) => setDate(date)}
                />
                <TimeInput
                handler={(value) => setTime(value)}
                />
            </div>
        </div>
        <div className={styles.results}>
            <div>
              Noname fee: {selectedCollection?.royalty || 0}%
            </div>
        </div>
        </div>
    }   
    <SquareBtn 
    disabled={validateData()}
    handler={
        isApproveCollection
        ?
        approveCollectionHandler
        :
        completeListing
        }
    btnId='none' 
    type='red' 
    width={
        isApproveCollection
        ?
        '440'
        :
        '362'
    }
    text={
        isApproveCollection
        ?
        'Continue'
        :
        'Complete Listing'
    }
    />
    </Modal>
    <CustomAlert
    handler={() => setIsCustomAlert(false)}
    type={
        isSuccessApprove
        ?
        'success'
        :
        'error'
    }
    title={
        isSuccessApprove
        ?
        'Success!'
        :
        'Opps!'
    }
    text={
        isSuccessApprove
        ?
        'You have successfully placed a listing NFTs'
        :
        'You have failed to place a bid (try again)!'
    }
    isVisible={isCustomAlert}
    />
    </>
  )
}

