import React, { useState } from 'react'
import {useDispatch} from'react-redux'

import {IoLogoGoogle} from 'react-icons/io5'

import fbApp, { GoogleAuthProvider } from '../../services/firebase'
import {alertActions} from '../../store/features/alertSlice'
import { userActions } from '../../store/features/userSlice'


export default function SignIn() {

    const dispactch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (e)=>{

        setEmail(e.target.value)

    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleSiginOnClick = (e)=>{

        e.preventDefault()

        fbApp.auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=>{

            dispactch(userActions.login())

            dispactch(alertActions.setMessage("success"))
            dispactch(alertActions.setType("success"))
            dispactch(alertActions.setDuration(3))
            dispactch(alertActions.show())

            setEmail("")
            setPassword("")
        })
        .catch(()=>{

            dispactch(alertActions.setMessage("Sorry. An error occurred"))
            dispactch(alertActions.setType("error"))
            dispactch(alertActions.setDuration(3))
            dispactch(alertActions.show())

        })


    }

    const handleSiginGoogleOnClick = (e)=>{

        e.preventDefault()

        const provider  = new GoogleAuthProvider()

        fbApp.auth()
        .signInWithPopup(provider)
        // .then((response)=>{
        //     console.log(response);

        //     dispactch(userActions.login())
        //     dispactch(userActions.setProfile({
        //         first_name: response?.additionalUserInfo.profile.given_name,
        //         picture: response?.additionalUserInfo.profile.picture
        //     }))

        //     dispactch(alertActions.setMessage("success"))
        //     dispactch(alertActions.setType("success"))
        //     dispactch(alertActions.setDuration(3))
        //     dispactch(alertActions.show())
        // })
        .catch((err)=>{
            console.log(err);

            dispactch(alertActions.setMessage("Sorry. An error occurred"))
            dispactch(alertActions.setType("error"))
            dispactch(alertActions.setDuration(3))
            dispactch(alertActions.show())

        })

    }

    return (
        <div className="page---signin">

            <div className="wrapper">

                <header className="header">
                    <h1>Sign In</h1>
                    <p>Fill the form to login into your account!</p>
                </header>

                <form action="" className="form">

                    <label htmlFor="email" className="fm_label">
                        Email
                        <input 
                            name="email" 
                            type="email" 
                            className="fm_input"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </label>
                    <label htmlFor="password" className="fm_label">
                        Password
                        <input 
                            name="password" 
                            type="password" 
                            className="fm_input"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </label>

                    <button 
                        className="btn"
                        onClick={handleSiginOnClick}
                        >
                        Signin
                    </button>
                    <button 
                        className="btn---google"
                        onClick={handleSiginGoogleOnClick}
                        >
                        <IoLogoGoogle /> Signin with google
                    </button>

                </form>

            </div>

            
        </div>
    )
}
