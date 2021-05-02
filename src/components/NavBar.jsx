import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'

export default function NavBar() {
    return (
        <div className="navbar">

            <div className="wrapper">
                <div className="logo">
                    <img src={logo} alt="Simple Tuts Logo"/>
                </div>

                <ul className="nav_links">
                    <li className="nav_link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav_link">
                        <Link to="/register">Register</Link>
                    </li>
                    {/* <li className="nav_link"></li> */}
                </ul>
            </div>
            
        </div>
    )
}
