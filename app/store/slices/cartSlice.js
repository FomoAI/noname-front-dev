import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        setCart(state,action){
            state.cart = action.payload
        },
        addItemToCart(state,action) {
            state.cart.push(action.payload)
        },
        removeItemFromCart(state,action){
            state.cart = state.cart.filter((cartItem) => {
                return cartItem._id !== action.payload._id
            })
        }
    }
})

export default cartSlice.reducer
export const {setCart,addItemToCart,removeItemFromCart} = cartSlice.actions