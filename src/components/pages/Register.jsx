import React, {useState } from 'react'
import {useDispatch} from'react-redux'


import fbApp from '../../services/firebase'
import {alertActions} from '../../store/features/alertSlice'

export default function Register() {

    

    const dispactch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleEmailChange = (e)=>{

        setEmail(e.target.value)

    }

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e)=>{
        setConfirmPassword(e.target.value)
    }

    const handleFirstNameChange= (e)=>{
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e)=>{
        setLastName(e.target.value)
    }

    const handleRegisterOnClick = (e)=>{

        e.preventDefault()

        if(password==="" && confirmPassword === ""){
            dispactch(alertActions.setMessage("Please provide a password"))
            dispactch(alertActions.setType("error"))
            dispactch(alertActions.setDuration(3))
            dispactch(alertActions.show())


            return
        }

        if(confirmPassword !== password){

            dispactch(alertActions.setMessage("The two passwords do not match"))
            dispactch(alertActions.setType("error"))
            dispactch(alertActions.setDuration(3))
            dispactch(alertActions.show())

            setPassword("")
            setConfirmPassword("")

            return

        }

        fbApp.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(()=>{

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

            setPassword("")

        })
    }


    return (
        <div className="page---registration">

            <div className="wrapper">

                <header className="header">
                    <h1>Register</h1>
                    <p>Fill the form to register for free</p>
                </header>

                <form action="" className="form">

                    <label htmlFor="firstName" className="fm_label">
                        First name
                        <input 
                            name="firstName" 
                            type="text" 
                            className="fm_input"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </label>

                    <label htmlFor="firstName" className="fm_label">
                        Last name
                        <input 
                            name="lastName" 
                            type="text" 
                            className="fm_input"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </label>

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

                    <label htmlFor="confirmPassword" className="fm_label">
                        Confirm Password
                        <input 
                            name="confrimPassword" 
                            type="password" 
                            className="fm_input"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </label>

                    <button 
                        className="btn"
                        onClick={handleRegisterOnClick}
                    >
                        Submit
                    </button>

                </form>

            </div>

        </div>
    )
}
