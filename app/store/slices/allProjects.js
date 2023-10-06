import { createSlice } from "@reduxjs/toolkit";


const allProjects = createSlice({
    name:"allProjects",
    initialState:{
        projects:[],
        donates:[]
    },
    reducers:{
        setProjects(state,action){
            state.projects = action.payload
        },
        setDonates(state,action){
            state.donates = action.payload
        }
    }
})

export const {setProjects,setDonates} = allProjects.actions
export default allProjects.reducer