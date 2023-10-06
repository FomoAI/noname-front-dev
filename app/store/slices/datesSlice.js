import { createSlice } from "@reduxjs/toolkit";


const datesSlice = createSlice({
    name:'dates',
    initialState:[
        {
            date:'01.12.2022',
            projects:[909191,909192,909193,909194]
        },
        {
            date:'02.12.2022',
            projects:[10812]
        }
    ],
})

export default datesSlice.reducer