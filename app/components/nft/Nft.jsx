import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector,useDispatch } from 'react-redux'
import { toggleModal } from '../../store/slices/modalsSlice'
import { getOrderByNftId,getOrderUsdByNftId,
    approveUsd,purchaseItem,purchaseItemUsd } from '../../smart/initialSmartNftMarket'
import { openModal, closeModal} from '../../store/slices/modalsSlice'
import getFloorPrice from '../../services/getFloorPrice'
import createNftHistory from '../../services/createNftHistory'
import listNft from '../../services/listNft'
import CustomAlert from '../../assets/components/CustomAlert/CustomAlert'
import loader from '../../utils/loader'
import useCart from '../../hooks/useCart'
import styles from '../styles/nft.module.scss'

export default function Nft({collectionIndex,toggleShowAllBtn,nft}) {
    const [isApprove,setIsApprove] = useState(true)
    const [nftFloorPrice,setNftFloorPrice] = useState(0)
    const [name,id] = nft.name?.split('#') 
    const isAuth = useSelector((state) => state.auth.userData.isAuth)
    const currency = useSelector((state) => state.currency.currencyArray)?.find((item) => item.isSelected)?.name
    const dispatch = useDispatch()
    const router = useRouter()
    const {addToCart} = useCart()

    const openConnectWallet = () => {
        dispatch(toggleModal('wallet'))
    }

    const navigateToCollection = () => {
        if(isAuth){
            router.push(`/marketplace/nft/${nft._id}`)        
        }else{
            dispatch(toggleModal('wallet'))
        }
    }

    const rarity = nft?.attributes?.find((attr) => {
        return attr?.trait_type?.toLowerCase() === 'rarity'
    })

    const confirmApprove = async () => {
        if(currency === 'ETH'){
            setIsApprove(false)
            return
        }
    
        dispatch(openModal('buyNft'))
    
        const {currentOrder} = await getOrderUsdByNftId(nft.nftId,nft.tokenAddress)
        const {success} = await approveUsd(currentOrder.orderPrice)

        setIsApprove(!success)
        dispatch(closeModal('buyNft'))
    }

    const buyByEth = async () => {
        const {currentOrder} = await getOrderByNftId(nft.nftId,nft.tokenAddress)
        console.log(currentOrder)
        const {success} = await purchaseItem(currentOrder.orderId,currentOrder.orderPrice)
    
        if(success){
            await listNft(nft.nftId,{priceEth:0,isListingEth:false,isListingUsdc:false,collectionAddress:nft.tokenAddress,priceEth:0})

            await createNftHistory({
                currency,
                nftSmartId:nft.nftId,
                collectionAddress:nft.tokenAddress,
                price:currentOrder.orderPrice,
                from:currentOrder.orderSeller,
                to:window.ethereum.selectedAddress
            })

            dispatch(openModal('isBuyNft'))
        }
    }
    
    const buyByUsdc = async () => {
        const {currentOrder} = await getOrderUsdByNftId(nft.nftId,nft.tokenAddress)
    
        const {success} = await purchaseItemUsd(currentOrder.orderId)
    
        if(success){
            await listNft(nft.nftId,{priceUsdc:0,isListingEth:false,isListingUsdc:false,collectionAddress:nft.tokenAddress,priceUsdc:0})

            await createNftHistory({
                currency,
                nftSmartId:nft.nftId,
                collectionAddress:nft.tokenAddress,
                price:currentOrder.orderPrice,
                from:currentOrder.orderSeller,
                to:window.ethereum.selectedAddress
            })

            dispatch(openModal('isBuyNft'))
        }
    }
 
    const buyNft = async () => {
        dispatch(openModal('buyNft'))

        if(currency === 'ETH'){
            await buyByEth()
        }else{
            await buyByUsdc()
            
        }

        dispatch(closeModal('buyNft'))
    }

    const checkAvailable = () => {
        const price = 
        currency === 'USDC' 
        ? 
        nft.priceUsdc 
        : 
        nft.priceEth

        const isListing = 
        currency === 'USDC' 
        ?
        nft.isListingUsdc
        :
        nft.isListingEth
        
        return (Number(price) <= 0 || !isListing)
    }
   
  return (
    <div
    onMouseEnter={toggleShowAllBtn ? () => toggleShowAllBtn('over') : () => {}}
    onMouseLeave={toggleShowAllBtn ? () => toggleShowAllBtn('out') : () => {}}
    className={styles.body + ' ' + 'nft-body'}>
        <img 
        onClick={navigateToCollection}
        className={styles.nftImage}
        src={nft.image} 
        alt={name}/>
        <div 
        onClick={navigateToCollection}
        className={styles.label}>
            {rarity?.value ? rarity?.value : 'RARE'}
        </div>
        <div 
        onClick={navigateToCollection}
        className={styles.id}>
           {id ? `#${id}` : '-'}
        </div>
        <div className={styles.info}>
            <div className={styles.title}>
                {name}
            </div>
            <div className={styles.row}>
                <div className={styles.item}>
                    <div className={styles.key}>
                        Price:
                    </div>
                    <div className={styles.value}>
                        {
                        `${
                            currency === 'USDC'   
                            ? 
                            (
                                nft.isListingUsdc
                                ?
                                nft.priceUsdc
                                :
                                '0' 
                            )
                            :
                            (
                                nft.isListingEth
                                ?
                                nft.priceEth
                                :
                                '0' 
                            ) 
                        } `
                        }
                    </div>
                </div>
                <div className={styles.item + ' ' + styles.floorPriceItem}>
                    <div className={styles.key}>
                    Floor price:
                    </div>
                    <div className={styles.value}>
                        {
                        currency === 'ETH'
                        ?
                        nft.floorPriceEth
                        :
                        nft.floorPriceUsdc
                        || '-'}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.key}>
                        Your share:
                    </div>
                    <div className={styles.value}>
                    {nft.share || '-'}
                    </div>
                </div>
            </div>
            <div id='nft-buttons' className={styles.buttons}>
                {
                    isAuth
                    ?
                    <div className={styles.actions}>
                        <button
                        disabled={checkAvailable()}
                        onClick={
                            isApprove && currency !== 'ETH'
                            ?
                            async () => await confirmApprove()
                            :
                            async () => await buyNft()
                        }
                        className={styles.btnRed}
                        >
                            {
                                isApprove && currency !== 'ETH'
                                ?
                                'Approve'
                                :
                                'By now'
                            }
                        </button>
                        <button
                        disabled={checkAvailable()}
                        onClick={async () => await addToCart(nft)}
                        className={styles.btn}
                        >To cart </button>
                    </div>
                    :
                    <button 
                    className={styles.btn}
                    onClick={openConnectWallet}
                    >
                        Connect wallet

                    </button>
                }

        </div>
        </div>
    </div>
  )
}
