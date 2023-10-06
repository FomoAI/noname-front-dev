import { configureStore } from '@reduxjs/toolkit'
import newsSlice from './slices/newsSlice'
import datesSlice from './slices/datesSlice'
import myProjectsSlice from './slices/myProjectsSlice'
import authSlice from './slices/authSlice'
import modalsSlice from './slices/modalsSlice'
import allProjects from './slices/allProjects'
import communitySlice from './slices/communitySlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    news:newsSlice,
    dates:datesSlice,
    myProjects:myProjectsSlice,
    auth:authSlice,
    modals:modalsSlice,
    allProjects:allProjects,
    community:communitySlice,
    cart:cartSlice
  } 
})
