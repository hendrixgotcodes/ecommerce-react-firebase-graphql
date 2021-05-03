import {createSlice} from '@reduxjs/toolkit'

const user = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        profile:{}
    },
    reducers: {
        login: (state)=>{
            state.loggedIn = true
        },
        logout: (state)=>{
            state.loggedIn= false
        },
        setProfile: (state, action)=>{
            state.profile = action.payload
        }
    }
})

export const selectLoggedIn = state=>state.user.loggedIn
export const selectUserProfile = state=>state.user.profile
export const userActions = user.actions

export default user.reducer