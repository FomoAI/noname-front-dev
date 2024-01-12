import { createSlice } from "@reduxjs/toolkit";


const currencySlice = createSlice({
    name:'currency',
    initialState:{
        currencyArray:[
            {
                name:'ETH',
                isSelected:true,
            },
            {
                name:'USDC',
                isSelected:false,
            },
        ]
    },
    reducers:{
        setCurrency(state,action){
            const activeCurrency = state.currencyArray.find((item) => !item.isSelected)

            localStorage.setItem('nonameCurrency',activeCurrency.name)

            state.currencyArray = state.currencyArray.map((item) => {
                if(item.isSelected){
                    return {...item,isSelected:false}
                }
                return {...item,isSelected:true}
            })
        }
    }
})

export default currencySlice.reducer
export const {setCurrency} = currencySlice.actions