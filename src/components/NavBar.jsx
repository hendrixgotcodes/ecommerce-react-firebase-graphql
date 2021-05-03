import { Avatar } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'
import fbApp from '../services/firebase'
import { alertActions } from '../store/features/alertSlice'
import {selectLoggedIn, selectUserProfile, userActions} from '../store/features/userSlice'

export default function NavBar() {

    // useEffect(() => {
        
    //     fbApp.auth()
    //     .onAuthStateChanged((user)=>{



    //     })

    // }, [])

    const dispactch = useDispatch()

    const userLoggedIn = useSelector(selectLoggedIn)
    const userProfile = useSelector(selectUserProfile)

    const handleSignoutOnClick = (e)=>{
        e.preventDefault()

        fbApp.auth()
        .signOut()
        .then(()=>{
            dispactch(userActions.logout())
        })
        .catch(()=>{

            dispactch(alertActions.show())
            dispactch(alertActions.setMessage("Failed to sign out"))
            dispactch(alertActions.setType("error"))
            dispactch(alertActions.setDuration(3))

        })
    }

    return (
        <div className="navbar">

            <div className="wrapper">
                <div className="logo">
                    <img src={logo} alt="Simple Tuts Logo"/>
                </div>

                {
                    userLoggedIn === true ? (

                        <div className="user_profile">
                            <Avatar src={userProfile?.picture}  />
                            <button onClick={handleSignoutOnClick} className="btn---logout">Sign Out</button>
                        </div>

                    ) : (
                        <ul className="nav_links">
                            <li className="nav_link">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="nav_link">
                                <Link to="/register">Register</Link>
                            </li>
                            <li className="nav_link">
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    )
                }
                
            </div>
            
        </div>
    )
}
