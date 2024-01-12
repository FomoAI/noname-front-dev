import { useMemo, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { useRouter } from 'next/router'
import { closeModal, toggleModal } from '../../../store/slices/modalsSlice'
import {
    getOrderByNftId,getOrderUsdByNftId, 
    purchaseItem,purchaseItemUsd,approveUsd
} from '../../../smart/initialSmartNftMarket'
import createNftHistory from '../../../services/createNftHistory'
import listNft from '../../../services/listNft'
import SquareBtn from '../../../components/UI/buttons/SquareLightBtn'
import CustomAlert from '../CustomAlert/CustomAlert'
import Modal from '../modal/Modal'
import loader from '../../../utils/loader'
import useCart from '../../../hooks/useCart'
import LoadingModal from '../LoadingModal/LoadingModal'
import styles from './cart-modal.module.scss'

export default function CartModal() {
  const [loading,setLoading] = useState(false)
  const [isApprove,setIsApprove] = useState(true)
  const [isCustomAlert,setIsCustomAlert] = useState(false)
  const [isSuccess,setIsSuccess] = useState(false)
  const isVisible = useSelector((state) => state.modals.cart.state)
  const currency = useSelector((state) => state.currency.currencyArray)?.find((item) => item.isSelected)?.name
  const dispatch = useDispatch()
  const router = useRouter()    
  const {cart,removeFromCart,clearCart} = useCart()  

  const modalHandler = (event) => {
    if(event.target.id === 'toggle-modal'){
        dispatch(toggleModal('cart'))        
    }
  }

  const navigate = (id) => {
    dispatch(closeModal('cart'))
    router.push(`/nft/${id}`)
  }
  
  const confirmApprove = async () => {
    if(currency === 'ETH'){
        setIsApprove(false)
        return
    }

    setLoading(true)
    let approveValue = 0
    for (let i = 0; i < cart.length; i++) {
        const nft = cart[i];
        
        const {currentOrder} = await getOrderUsdByNftId(nft.nftId,nft.tokenAddress)

        approveValue = approveValue + currentOrder.orderPrice
        
    }
    await approveUsd(approveValue)
    
    setIsApprove(false)
    setLoading(false)
  }

  const buyByEth = async (nft) => {
    const {currentOrder} = await getOrderByNftId(nft.nftId,nft.tokenAddress)

    const {success} = await purchaseItem(currentOrder.orderId,currentOrder.orderPrice)
    console.log(nft)
    console.log(currentOrder)
    if(success){
        await listNft(nft.nftId,{priceEth:0,isListingEth:false,isListingUsdc:false,collectionAddress:nft.tokenAddress})

        await createNftHistory({
            currency,
            nftSmartId:nft.nftId,
            collectionAddress:nft.tokenAddress,
            price:currentOrder.orderPrice,
            from:currentOrder.orderSeller,
            to:window.ethereum.selectedAddress
        })

        setIsCustomAlert(true)

        setIsSuccess(true)
    
        clearCart()
    }
  }

  const buyByUsdc = async (nft) => {
    const {currentOrder} = await getOrderUsdByNftId(nft.nftId,nft.tokenAddress)

    const {success} = await purchaseItemUsd(currentOrder.orderId)

    if(success){
        await listNft(nft.nftId,{priceUsdc:0,isListingEth:false,isListingUsdc:false,collectionAddress:nft.tokenAddress})
         
        await createNftHistory({
            currency,
            nftSmartId:nft.nftId,
            collectionAddress:nft.tokenAddress,
            price:currentOrder.orderPrice,
            from:currentOrder.orderSeller,
            to:window.ethereum.selectedAddress
        })

        setIsCustomAlert(true)

        setIsSuccess(true)
    
        clearCart()
    }
  }

  const buyNft = async () => {
    setLoading(true)
   
    for (let i = 0; i < cart.length; i++) {
        if(currency === 'ETH'){
            await buyByEth(cart[i])
        }else{
            await buyByUsdc(cart[i])
        }
    }
    setLoading(false)
  }

  const price = useMemo(() => {
    let priceValueEth = 0
    let priceValueUsdc = 0

    for (let i = 0; i < cart.length; i++) {
        const nft = cart[i];
        
        priceValueEth += Number(nft.priceEth)
        priceValueUsdc += Number(nft.priceUsdc)
    }

    return {eth:priceValueEth,usdc:priceValueUsdc}
  },[cart])

  const validationBuy = () => {
    if(currency === 'USDC'){
        return Number(price.usdc) === 0
    }else{
        return Number(price.eth) === 0
    }
  }

  return (
    <>
        <Modal 
        handler={modalHandler}
        title={'My cart'}
        isVisible={isVisible}>
            {
                loading
                ?
                <LoadingModal
                title={
                    isApprove
                    ?
                    'Confrim approve'
                    :
                    'Confrim buy'
                }
                subTitle={'NFT Marketplace'}
                />
                :
                <div className={styles.body}>
                <div className={styles.items}>
                    {
                    cart.length 
                    ?
                    cart.map((cartItem,index) => {
                        return (
                            <div 
                            key={cartItem._id}
                            className={styles.itemWrapper}>
                             <div 
                            onClick={() => navigate(cartItem._id)}
                            tabIndex={0}
                            className={styles.item}>
                                <img
                                className={styles.itemImg}
                                loading='lazy' 
                                src={cartItem.image} 
                                alt="nft image"/>
                                <div className={styles.itemInfo}>
                                    <div className={styles.title}>
                                        {cartItem.name}
                                    </div>
                                    <div className={styles.description}>
                                        {cartItem.description}
                                    </div>
                                </div>
                                <div className={styles.itemPrice}>
                                    {currency === 'ETH' ? cartItem.priceEth : cartItem.priceUsdc} {currency}
                                </div>
                             </div>
                             <button 
                              id='remove'
                              className={styles.deleteBtn}
                              onClick={() => removeFromCart(cartItem)}
                              >
                               <svg id='remove' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id='remove' d="M9.98996 1.65755C9.81338 1.66031 9.64511 1.73302 9.52207 1.85971C9.39904 1.98641 9.3313 2.15674 9.33371 2.33333V2.66667H5.66705C5.57874 2.66547 5.49107 2.68183 5.40914 2.71479C5.3272 2.74776 5.25263 2.79667 5.18976 2.8587C5.12689 2.92072 5.07696 2.99462 5.04289 3.0761C5.00881 3.15758 4.99127 3.24502 4.99127 3.33333H4.00038C3.91204 3.33208 3.82433 3.3484 3.74235 3.38135C3.66037 3.41429 3.58576 3.4632 3.52285 3.52523C3.45993 3.58726 3.40998 3.66117 3.37588 3.74268C3.34178 3.82418 3.32422 3.91165 3.32422 4C3.32422 4.08835 3.34178 4.17582 3.37588 4.25732C3.40998 4.33883 3.45993 4.41274 3.52285 4.47477C3.58576 4.5368 3.66037 4.58571 3.74235 4.61865C3.82433 4.65159 3.91204 4.66792 4.00038 4.66667H16.0004C16.0887 4.66792 16.1764 4.65159 16.2584 4.61865C16.3404 4.58571 16.415 4.5368 16.4779 4.47477C16.5408 4.41274 16.5908 4.33883 16.6249 4.25732C16.659 4.17582 16.6765 4.08835 16.6765 4C16.6765 3.91165 16.659 3.82418 16.6249 3.74268C16.5908 3.66117 16.5408 3.58726 16.4779 3.52523C16.415 3.4632 16.3404 3.41429 16.2584 3.38135C16.1764 3.3484 16.0887 3.33208 16.0004 3.33333H15.0095C15.0095 3.24502 14.9919 3.15758 14.9579 3.0761C14.9238 2.99462 14.8739 2.92072 14.811 2.8587C14.7481 2.79667 14.6736 2.74776 14.5916 2.71479C14.5097 2.68183 14.422 2.66547 14.3337 2.66667H10.667V2.33333C10.6683 2.24414 10.6516 2.15561 10.618 2.07298C10.5844 1.99036 10.5345 1.91531 10.4714 1.8523C10.4082 1.78928 10.3331 1.73958 10.2504 1.70613C10.1677 1.67268 10.0792 1.65616 9.98996 1.65755ZM4.00038 6L5.19569 16.1562C5.27436 16.8276 5.84261 17.3333 6.51861 17.3333H13.4822C14.1582 17.3333 14.7257 16.8276 14.8051 16.1562L16.0004 6H4.00038Z" />
                                </svg>
                             </button>
                            </div>
                        )
                    })
                    :
                    <div className={styles.empty}>
                        Cart is empty...
                    </div>
                    }
                </div>
                <div className={styles.payInfo}>
                    <hr className={styles.line}/>
                    <div className={styles.payDetails}>
                        <div className={styles.key}>
                            You Pay
                        </div>
                        <div className={styles.payValue}>
                            <div className={styles.value}>
                                {currency === 'ETH' ? price.eth : price.usdc} {currency}
                            </div>
                            <div className={styles.usdPay}>
                                ${currency === 'USDC' ? price.usdc : 0}
                            </div>
                        </div>
                    </div>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.btn}>
                <SquareBtn
                btnId='none'
                disabled={!cart.length || validationBuy()}
                handler={
                    isApprove
                    ?
                    confirmApprove
                    :
                    buyNft
                }
                width='330'
                height='48'
                type='red'
                text={
                    isApprove
                    ?
                    'Approve'
                    :
                    'Buy now'
                }
                />
                </div>
                </div>
            }

        </Modal>
        <CustomAlert
        handler={() => setIsCustomAlert(false)}
        isVisible={isCustomAlert}
        type={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Success!' : 'Opps!'}
        text={
            isSuccess 
            ? 
            `You have successfully buy nft!`
            :
            `Error occuried. Try again or contact the support.`
        }
        />
            
    </>
  )
}
