import {Outlet, Link} from "react-router-dom"
import logo from '../../images/LinkPulseLogo.png';
import "../../styles/style.css"

import React from 'react'

const Layout = () => {
  return (
    <div>
        <div className="layout">
            <header className="logo">
                <img src={logo} alt="LinkPulse logo" />
                <h3>URL Shortening Service</h3>
            </header>

            <hr />
            
            <Outlet />
        </div>
    </div>
  )
}

export default Layout