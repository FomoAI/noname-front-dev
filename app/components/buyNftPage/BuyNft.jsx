import { useEffect, useState } from 'react'  
import { 
  purchaseItem,purchaseItemUsd,
  approveUsd,getBuyNftAccess,
 } from '../../smart/initialSmartNftMarket'
 import { calculateDiscount } from '../../utils/calculateDiscount'
 import { useSelector, useDispatch } from 'react-redux'
 import { setCurrency } from '../../store/slices/currencySlice'
 import parseDate from '../../utils/parseDate'
import createBidByUser from '../../services/createBidByUser'
import createNftHistory from '../../services/createNftHistory'
import BidsCalendar from '../../assets/components/bidsCalendar/BidsCalendar'
import listNft from '../../services/listNft'
import Image from 'next/image'
import Link from 'next/link'
import manSvg from '../../assets/icons/man.svg'
import SquareBtn from '../UI/buttons/SquareLightBtn'
import NftDetails from '../../assets/components/nftDetails/NftDetails'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import getBid from '../../services/getBid'
import loader from '../../utils/loader'
import CurrencyCheckbox from '../../assets/components/currencyCheckbox/CurrencyCheckbox'
import LoaderCustom from '../../assets/components/loader/Loader'
import styles from '../styles/buy-nft.module.scss'

export default function BuyNft({nft}) {
  const [loading,setLoading] = useState(false)
  const [isCustomAlert,setIsCustomAlert] = useState(false)
  const [isCalendar,setIsCalendar] = useState(false)
  const [isMakeOrder,setIsMakeOrder] = useState(false)

  const [isSuccessOrder,setIsSuccessOrder] = useState(false)
  const [isSuccessBuy,setIsSuccessBuy] = useState(false)

  const [isOrderAccess,setIsOrderAccess] = useState(false)
  const [isBuyAccess,setIsBuyAccess] = useState(false)

  const [confrimedBid,setConfirmedBid] = useState(false)
  const [customOrder,setCustomOrder] = useState(null)
  const [isApprove,setIsApprove] = useState(false)
  const [bidEndDate,setBidEndDate] = useState()
  const [orderValue,setOrderValue] = useState(0)
  const [name] = nft?.nftTitle?.split('#') 
  const dispatch = useDispatch()
  const currenyItems = useSelector((state) => state.currency.currencyArray)
  const currency = currenyItems?.find((value) => value?.isSelected)?.name

  const changeCurrency = () => {
    dispatch(setCurrency())
  }

  const confirmCreateBid = async () => {
    const currentBidEnd = bidEndDate ? new Date(parseDate(bidEndDate)) : new Date()
    currentBidEnd.setHours(24,0,0,0)

    const bidData = {
      value:orderValue,
      currency:currency,
      expiryDate:currentBidEnd,
      belowFloor:calculateDiscount(currency === 'ETH' ? nft.priceEth : nft.priceUsdc,orderValue),
      nftSmartId:nft.nftSmartId,
    }
    setLoading(true)

    const {success,bid} = await createBidByUser(window.ethereum.selectedAddress,nft.nftId,nft.smart,nft.collectionId,bidData)

    setLoading(false)
    setIsMakeOrder(false)
    setIsOrderAccess(false)
  }

  const confirmApprove = async () => {
    if(currency === 'ETH'){
        setIsApprove(true)
        return
    }

    const {success} = await approveUsd(customOrder.price)

    setIsApprove(success)
  }

  const buyByEth = async () => {
      console.log(customOrder.orderId,customOrder.price)
      const {success} = await purchaseItem(customOrder.orderId,customOrder.price)

      if(success){
        await createNftHistory({
          currency:'ETH',
          nftSmartId:nft.nftSmartId,
          collectionAddress:nft.smart,
          price:customOrder.price,
          from:customOrder.seller,
          to:customOrder.buyer
        })

        await listNft(nft.nftSmartId,{priceEth:0,isListingEth:false,isListingUsdc:false})

      }
  }

  const buyByUsdc = async () => {
      const {success} = await purchaseItemUsd(customOrder.orderId)

      if(success){
        await createNftHistory({
          currency:'USDC',
          nftSmartId:nft.nftSmartId,
          collectionAddress:nft.smart,
          price:customOrder.price,
          from:customOrder.seller,
          to:customOrder.buyer
        })

         await listNft(nft.nftSmartId,{priceUsdc:0,priceEth:0,isListingEth:false,isListingUsdc:false})
      }
  }

  const buyNft = async () => {
    if(!isBuyAccess || !customOrder) return 
    
    if(currency === 'ETH'){
        await buyByEth()
    }else{
        await buyByUsdc()
    }

    setIsSuccessBuy(true)
    setIsCustomAlert(true)   
  }
 
  useEffect(() => {
    const getAccessInfo = async () => {
      const {isAvailable,order} = await getBuyNftAccess(window.ethereum.selectedAddress,nft.nftSmartId,currency === 'ETH')

      if(!isAvailable) return 
      
      const {bid} = await getBid(nft.smart,nft.nftId,window.ethereum.selectedAddress,Number(order.price))

      setCustomOrder(order)
      setConfirmedBid(bid)
      setIsBuyAccess(isAvailable)
      setIsOrderAccess(isAvailable)
    }

    getAccessInfo()
  },[currency])
  
  if(loading) return <LoaderCustom/>

  return (
    <>
    <div className={styles.body}>
      <div className={styles.links}>
        <Link
        className={styles.link}
        href={'/marketplace'}
        >
        NFT Marketplace {'>'}
        </Link>
        <div
        className={styles.currentNft}
        >
        {nft?.name}
        </div>
      </div>    
      <div className={styles.main}>
        <div className={styles.img}>
          <img src={nft.nftImg} alt={'nft image'}/>
        </div>      
        <div className={styles.info}>
          <div className={styles.infoHead}>
            <div className={styles.creator}>
              {
                nft.creatorData?.discordData?.avatar
                ?
                <img src={`https://cdn.discordapp.com/avatars/${nft.creatorData?.discordData?.id}/${nft.creatorData?.discordData?.avatar}?size=24`}/>
                :
                <Image src={manSvg} alt='creator img'/>
              }
              <span>{nft.creatorData?.discordData?.username}</span>
            </div>
            {
              !isBuyAccess
              ?
              <div className={styles.currencyWrapper}>
              <CurrencyCheckbox
              items={currenyItems}
              hanlder={changeCurrency}
              />
              </div>
              :
              <></>
            }

          </div>
          <div className={styles.nftInfo}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
              {name}
              </h1>
              <div className={styles.nftId}>
              #{nft.nftSmartId || '-'}
              </div>
            </div>
            <div className={styles.bio}>
              <span>Bio: </span>
              {nft.nftDescription}
            </div>
          </div>
          <div className={styles.buyBlock}>
            <div className={styles.buyInfo}>
              <img src={nft.nftImg} alt='img'/>
              <div className={styles.buyDetails}>
                <div className={styles.buyNftName}>
                  <span>Listed on </span>Noname
                </div>
                <div className={styles.buyPrice}>
                  {
                  isBuyAccess && customOrder
                  ?
                    <span>{customOrder.price} {confrimedBid.currency || 'ETH'}</span>
                  :
                    currency === 'USDC' 
                    ?
                    <span>{nft.priceUsdc} USDC</span>
                    :
                    <span>{nft.priceEth} ETH</span>
                  } 
                </div>
              </div>
            </div>  
            <div className={styles.buyBtns}>
              <SquareBtn
              disabled={!isBuyAccess}
              handler={
                isApprove 
                ?
                buyNft
                :
                confirmApprove
              }
              type='red'
              width='190'
              height='48'
              text={
                isApprove
                ?
                'Buy'
                :
                'Approve'
              }
              />
              {
                isMakeOrder
                ?
                <div className={styles.makeOrderWrapper}>
                  <input
                  type='number'
                  onChange={(e) => setOrderValue(e.target.value)}
                  value={orderValue}
                  placeholder={'0'}
                  />
                  <div className={styles.inputLabel}>
                    {
                      currency === 'ETH' 
                      ?
                      'ETH'
                      :
                      'USDC'
                    }
                  </div>
                  <button 
                  disabled={orderValue <= 0}
                  onClick={confirmCreateBid}
                  className={styles.confirmBtn}>
                  Confirm
                  </button>
                  <div className={styles.calendarWrapper}>
                    <button 
                    onClick={() => setIsCalendar((prev) => !prev)}
                    className={styles.calendarButton}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M6 0C5.45312 0 5 0.453125 5 1V2H2C1.41992 2 1 2.41992 1 3V6.5H24V3C24 2.41992 23.5801 2 23 2H20V1C20 0.453125 19.5469 0 19 0H18C17.4531 0 17 0.453125 17 1V2H8V1C8 0.453125 7.54688 0 7 0H6ZM6 1H7V4H6V1ZM18 1H19V4H18V1ZM1 7.5V23C1 23.5801 1.41992 24 2 24H23C23.5801 24 24 23.5801 24 23V7.5H1ZM6 10.5H8.5V13H6V10.5ZM9.5 10.5H12V13H9.5V10.5ZM13 10.5H15.5V13H13V10.5ZM16.5 10.5H19V13H16.5V10.5ZM6 14H8.5V16.5H6V14ZM9.5 14H12V16.5H9.5V14ZM13 14H15.5V16.5H13V14ZM16.5 14H19V16.5H16.5V14ZM6 17.5H8.5V20H6V17.5ZM9.5 17.5H12V20H9.5V17.5ZM13 17.5H15.5V20H13V17.5ZM16.5 17.5H19V20H16.5V17.5Z" fill="#FF507D"/>
                      </svg>
                    </button>
                    <BidsCalendar
                    range={false}
                    dates={bidEndDate}
                    stateHandler={(name,value) => setBidEndDate(value)}
                    setIsOpen={setIsCalendar}
                    isOpen={isCalendar}
                    />
                  </div>

                </div>
                :
                <SquareBtn
                disabled={isOrderAccess}
                handler={() => setIsMakeOrder((prev) => !prev)}
                width='190'
                height='48'
                text={'+ Make order'}
                />
              }
            </div>
          </div>
          <div className={styles.nftDetailsDesktop}>
            <NftDetails nft={{...nft,currency}}/>
          </div>
        </div>
      </div>
      <div className={styles.nftDetailsMobile}>
        <NftDetails nft={{...nft,currency}}/>
      </div>
    </div>
    <CustomAlert 
    isVisible={isCustomAlert}
    type={isSuccessBuy ? 'success' : 'error'}
    title={isSuccessBuy ? 'Success!' : 'Opps!'}
    text={
      isSuccessBuy 
      ? 
      `You have successfully become a member of No name. Congratulations!`
      :
      `Error occuried. Try again or contact the support.`
    }
    handler={() => setIsCustomAlert(false)}
    />
    <CustomAlert 
    isVisible={isSuccessOrder}
    type={isSuccessOrder ? 'success' : 'error'}
    title={isSuccessOrder ? 'Success!' : 'Opps!'}
    text={
      isSuccessOrder 
      ? 
      `You have successfully created an order for ${nft?.name}`
      :
      `Error occuried. Try again or contact the support.`
    }
    handler={() => setIsSuccessOrder(false)}
    />
    </>

  )
}
