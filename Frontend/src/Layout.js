import React from 'react';
import {Outlet, Link} from "react-router-dom";

import Footer from './main/components/Footer';
import logo from './images/LinkPulseLogo.png';


function Layout() {
  return (
      <div className="layout">
          <nav>
              <div className="left">
                  <Link to="/">
                      <img src={logo} alt="LinkPulse logo" />
                  </Link>
                  <h1>URL Shortener</h1>
              </div>
              <div className="right">
                  <ul>
                      <li>
                          <Link to="/premium">Premium</Link>
                      </li>
                      <li>
                          <Link to="/login">Login</Link>
                      </li>
                      <li>
                          <Link to="/singup">SignUp</Link>
                      </li>
                  </ul>
              </div>
          </nav>

          <main>
            <Outlet />
          </main>

          <Footer />
      </div>
  );
}

export default Layout