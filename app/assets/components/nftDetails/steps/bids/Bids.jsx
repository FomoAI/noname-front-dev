import { useState,useEffect, useMemo } from 'react'
import { numberToBigNumber,getCurrentDecimal } from '../../../../../smart/initialSmartMain'
import { checkNftOwner,createItemForSm,createItemForSmUsd } from '../../../../../smart/initialSmartNftMarket'
import deleteBid from '../../../../../services/deleteBid'
import getBids from '../../../../../services/getBids'
import Image from 'next/image'
import sliceAddress from '../../../../../utils/sliceAddress'
import arrowRotateSvg from '../../../../icons/arrow-rotate.svg'
import LoaderCustom from '../../../loader/Loader'
import styles from './bids.module.scss'

const sortsValues = {
  date:{
    name:'Date',
    value:'new'
  }
}

export default function Bids({nft}) {
  const [loading,setLoading] = useState(false)
  const [isOwner,setIsOwner] = useState(false)
  const [bids,setBids] = useState([])
  const [isSortOpen,setIsSortOpen] = useState(false)
  const [sortValue,setSortValue] = useState('Date')
  const [sortData,setSortData] = useState({price:'',date:''})
  
  const confirmBidByOwner = async (bid) => {
    if(!isOwner) return 
    setLoading(true)
    const {currentNumber,currentDecimals} = getCurrentDecimal(bid.value)
    const timeEnd = new Date(bid.expiryDate).getTime()
    const nftId = nft.nftSmartId
    const tokenAddress = nft.smart
    const priceBigNumber = numberToBigNumber(currentNumber,currentDecimals)
    const buyer = bid.user

    const {success} = 
    nft?.currency === 'ETH' 
    ?
    await createItemForSm(timeEnd,nftId,tokenAddress,priceBigNumber,buyer)
    :
    await createItemForSmUsd(timeEnd,nftId,tokenAddress,priceBigNumber,buyer)

    if(success){
      await deleteBid(bid._id)
      setBids((prev) => {
        return (
          prev.filter((item) => item._id !== bid._id)
        )
      })
    }

    setLoading(false)

  }

  const sortBidsHandler = (name,value) => {
    if(name === 'price'){
      setSortValue('Price')
    }else{
      setSortValue('Date')
    }
    setSortData((prev) => {
      return (
        {
          price:"",
          date:"",
          [name]:value
        }
      )
    })
  }

  const sortedBids = useMemo(() => {
    if(sortData.date){
      return bids.sort((a,b) => {
        if(sortData.date === 'new'){
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
        }else{
          return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime()
        }
      })
    }

    if(sortData.price){
      return bids.sort((a,b) => {
        if(sortData.price === 'low'){
          return a.value - b.value 
        }else{
          return b.value - a.value
        }
      })
    }

    return bids

  },[bids,sortData])

  useEffect(() => {
    const initialBidsData = async () => {
      setLoading(true)

      const {bids} = await getBids(nft.smart,nft.nftId)
      const res = await checkNftOwner(nft.smart,nft.nftSmartId,nft?.currency === 'ETH')

      setLoading(false)
      setBids(bids)
      setIsOwner(res.isOwner)
    }
    initialBidsData()
  },[])

  if(loading) return <LoaderCustom/>

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
        <div className={
          isSortOpen 
          ?
          styles.sortModal + ' ' + styles.openModal 
          :
          styles.sortModal
        }>
          <div className={styles.sortItem}>
              <span>Price:</span>
              <div className={styles.sortInputs}>
                <div className={styles.sortCheckBox}>
                  <input onChange={(e) => sortBidsHandler('price','low')} name='sort-radio' type="radio" id='price-low'/>
                  <label htmlFor="price-low">Low</label>
                </div>
                <div className={styles.sortCheckBox}>
                  <input onChange={(e) => sortBidsHandler('price','high')} name='sort-radio' type="radio" id='price-high'/>
                  <label htmlFor="price-high">High</label>
                </div>
              </div>
          </div>
          <div className={styles.sortItem}>
              <span>Date:</span>
              <div className={styles.sortInputs}>
                <div className={styles.sortCheckBox}>
                  <input onChange={(e) => sortBidsHandler('date','new')} name='sort-radio' type="radio" id='price-new'/>
                  <label htmlFor="price-new">New</label>
                </div>
                <div className={styles.sortCheckBox}>
                  <input onChange={(e) => sortBidsHandler('date','old')} name='sort-radio' type="radio" id='price-date'/>
                  <label htmlFor="price-date">Old</label>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className={styles.items}>
          {
            sortedBids?.length
            ?
            sortedBids.map((item,index) => {
              return (
                <div
                key={item._id}
                className={styles.item}
                >
                  <div className={styles.itemRow}>
                    <span className={styles.value}>
                      {item.value} {item.currency}
                    </span>
                    <span className={styles.key}>
                      {
                        item.belowFloor > 0
                        ?
                        `${item.belowFloor}% below floor`
                        :
                        ''
                      }
                    </span>
                  </div>
                  <div className={styles.itemRow}>
                    <div className={styles.by}>
                      <span className={styles.key}>By</span>
                      <span className={styles.value}>
                        {sliceAddress(item.user)}
                      </span>
                    </div>
                    <span className={styles.key}>
                      Expiry: in {item.expiryIn}
                    </span>
                  </div>
                  {
                    isOwner
                    ?
                    <button 
                    onClick={() => confirmBidByOwner(item)}
                    className={styles.confirmBtn}>
                      Confirm
                    </button>
                    :
                    <></>
                  }
                  <hr className='line'/>
                </div>
              )
            })
            :
            <div className={styles.empty}>
                Empty list...
            </div>
          }
      </div>
    </div>
  )
}
