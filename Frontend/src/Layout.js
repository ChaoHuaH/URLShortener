import React from 'react';
import {Outlet, Link, useLocation} from "react-router-dom";
import { useGlobalContext } from "./context/GlobalContext";
import Footer from './main/components/Footer';
import logo from './images/LinkPulseLogo.png';


function Layout() {
    const {pathname} = useLocation();
    const {user, Logout} = useGlobalContext();
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
                    {user ? (
                        <>
                            <li>
                                <h4>Hello {user.name}!</h4>
                            </li>
                            <li>
                                <button className="btn" onClick={Logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        pathname === "/" ? (
                            <li>
                                <Link to="/register"> Register </Link>
                            </li>

                        ) : (
                            <li>
                                <Link to="/login" > Login </Link>
                            </li>
                        )
                    )}
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