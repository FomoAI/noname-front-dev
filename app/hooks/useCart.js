import { useEffect, useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getOrderByNftId,getOrderUsdByNftId } from '../smart/initialSmartNftMarket'
import { setCart } from '../store/slices/cartSlice'

export default function useCart() {
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch()

    const getCartFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('nonameCart'))
    }

    const addCartToLocalStorage = (cart) => {
        localStorage.setItem('nonameCart',JSON.stringify(cart))
    }

    const addToCart = useCallback( async (item) => {
        const {currentOrder} = await getOrderUsdByNftId(item.nftId)
      
        const cartData = getCartFromLocalStorage()

        const isAdded = cartData.find((cartItem) => cartItem._id === item._id)

        if(isAdded) return
        
        addCartToLocalStorage([...cartData,{...item,...currentOrder}])
        
        dispatch(setCart([...cartData,{...item,...currentOrder}]))
    },[cart])

    const removeFromCart = useCallback((item) => {
        const cartData = getCartFromLocalStorage()

        const filteredCart = cartData.filter((cartItem) => {
            return cartItem._id !== item._id 
        })

        addCartToLocalStorage(filteredCart)

        dispatch(setCart(filteredCart))
    },[cart])

    const clearCart = useCallback(() => {
        addCartToLocalStorage([])
        dispatch(setCart([]))
    },[cart])

    useEffect(() => {
        const cartData = getCartFromLocalStorage()
        if(cartData){
            dispatch(setCart(cartData))
        }else{
            addCartToLocalStorage([])
            dispatch(setCart([]))
        }
    },[])

    return {cart,addToCart,removeFromCart,clearCart}
}
