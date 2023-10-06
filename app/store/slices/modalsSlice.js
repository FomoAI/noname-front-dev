import { createSlice } from "@reduxjs/toolkit";
import blockScroll from "../../utils/blockScroll";

const modalsSlice = createSlice({
    name:'modals',
    initialState:{
        connect:{state:false},
        complete:{state:false},
        buy:{state:false},
        offers:{state:false},
        confirm:{state:false},
        wallet:{state:false},
        search:{state:false},
        settings:{state:false},
        nav:{state:false},
        share:{state:false},
        cookie:{state:false},
        successConnect:{state:false},
        discordConnect:{state:false},
        loginResult:{state:false},
        nonameDao:{state:false},
        listForSale:{state:false},
        cart:{state:false},
        nftFilter:{state:false},
        collectionsFilter:{state:false},
        nonameNavigation:{state:false},
        waitingListFilter:{state:false},
    },
    reducers:{
        closeModal(state,action){
            state[action.payload].state = false
            blockScroll('remove')
        },
        closeModalWithoutBlock(state,action){
            state[action.payload].state = false
        },
        openModal(state,action){
            state[action.payload].state = true
            blockScroll('add')
        },
        openModalWithoutBlock(state,action){
            state[action.payload].state = true
        },
        toggleModal(state,action){
            state[action.payload].state = !state[action.payload].state
            blockScroll('toggle')
        },
        toggleModalWithoutBlock(state,action){
            state[action.payload].state = !state[action.payload].state
        },
    }
})
    
export const {
    closeModal,openModal,openModalWithoutBlock,toggleModal,
    toggleModalWithoutBlock,closeModalWithoutBlock
} = modalsSlice.actions
export default modalsSlice.reducer