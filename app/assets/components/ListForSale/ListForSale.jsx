import { useMemo, useState , useEffect} from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../store/slices/modalsSlice'
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
    const [floorPriceValue,setFloorPriceValue] = useState(0.0016)
    const [price,setPrice] = useState()

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
        if(!floorPrice){
            setPrice(floorPriceValue)    
            setCurrency('ETH')
        }else{
            setPrice('')
        }

        setFloorPrice((prev) => !prev)
    }

    const changeCurrency = (value) => {
        setCurrency(value)
        setIsCurrencyList(false)
    }

    const changeDuration = (value) => {
        setDuration(value)
        setIsDurationList(false)
    }

    const completeListing = () => {
        setIsApproveCollection(true)
    }

    const approveCollectionHandler = () => {
        dispatch(closeModal('listForSale'))
        setIsSuccessApprove(true)
        setIsCustomAlert(true)
        
        setTimeout(() => {
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

    const performSearch = async () => {
        try {
            setLoading(true)  

            const {nfts} = await getNftsByName(selectedCollection._id,nftSearchValue)

            setAllNfts(nfts)

            setLoading(false)  
        } catch (error) {
            console.error('Search error: ', error);
        }
    };

    const filteredCollections = useMemo(() => {
        return collections.filter((collection) => {
            return collection.title.toLowerCase().includes(collectionSearchValue.toLowerCase())
        })
    },[collectionSearchValue])

    useEffect(() => {
        const delayTimer = setTimeout(() => {
          if (nftSearchValue !== '') {
            performSearch();
          }
        }, 1000);
    
        return () => clearTimeout(delayTimer);
    }, [nftSearchValue]);

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
                Floor price: 0,0016 ETH
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
                <div className={styles.durationWrapper}>
                    <button 
                    onClick={() => setIsDurationList((prev) => !prev)}
                    className={styles.selectedCurrency + ' ' + styles.timeBtn}>
                        {
                            isDurationList
                            ?
                            <Image 
                            className={styles.rotate}
                            src={arrowSvg} alt='arrow'/>
                            :
                            <Image src={arrowSvg} alt='arrow'/>
                        }
                        {duration}
                    </button> 
                    <div className={
                        isDurationList
                        ?
                        styles.durationList + ' ' + styles.visible
                        :
                        styles.durationList
                    }>
                        {
                            timeList.map((item) => {
                                return (
                                    <button 
                                    key={item}
                                    onClick={() => changeDuration(item)}
                                    className={styles.currencyBtn}>
                                        {item}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
        <div className={styles.results}>
            <div>
              Noname fee: 0%
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

