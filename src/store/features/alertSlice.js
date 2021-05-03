import {createSlice} from '@reduxjs/toolkit'

const alert = createSlice({
    name: "alert",
    initialState: {
        message: "",
        type: "",
        duration: 3000,
        shown: false
    },
    reducers: {

        show: (store)=>{

            store.shown = true

        },
        hide: (store)=>{
            store.shown = false
        },
        setMessage: (store, action)=>{
            store.message = action.payload
        },
        setType: (store, action)=>{
            store.type = action.payload
        },
        setDuration: (store, action)=>{
            store.duration = action.payload * 1000
        }

    }

})

export const selectAlertMessage = (state)=> state.alert.message
export const selectAlertType = (state)=> state.alert.type
export const selectAlertShown = (state) => state.alert.shown
export const selectAlertDuration = (state)=> state.alert.duration

export const alertActions = alert.actions

export default alert.reducer