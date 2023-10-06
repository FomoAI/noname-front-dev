import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        userData:{
            isAuth: false,
            address:'',
            balance:''
        },
        provider:{}
    },
    reducers:{
        setUserData(state,action){
            state.userData = action.payload
            localStorage.setItem('userData',JSON.stringify(action.payload))
        },
        login(state){
            state.userData.isAuth = true
        },
        logout(state){
            state.userData.isAuth = false
            window.localStorage.removeItem('userData');
        },
        setProvider(state,action){
            state.provider = action.payload
        }
    }
})

export default authSlice.reducer
export const {setUserData,login,logout,setProvider} = authSlice.actions