import {combineReducers} from '@reduxjs/toolkit'
import alert from './features/alertSlice'
import user from './features/userSlice'

const primaryReducer = combineReducers({
    alert,
    user
})

export default primaryReducer