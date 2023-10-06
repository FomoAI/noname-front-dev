import { createSlice } from "@reduxjs/toolkit";


const communitySlice = createSlice({
    name:'community',
    initialState:{
        discord:'/',
        opensea:'/'
    },
    reducers:{
        setDiscord(state,action){
            state.discord = action.payload
        },
        setOpenSea(state,action){
            state.opensea = action.payload
        }
    }
})

export default communitySlice.reducer
export const {setDiscord,setOpenSea} = communitySlice.actions