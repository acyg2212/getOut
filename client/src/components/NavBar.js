import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import getOutLogo from '../assets/getOut.png'
import AuthContext from '../auth'
import ModalAuth from "./ModalAuth"

const NavBar = () => {

    const [authWindow, setAuthWindow] = useState(false);

    const { fetchWithCSRF, setCurrentUserId, currentUserId } = useContext(AuthContext);
    let history = useHistory();

    function logOut(e) {
        e.preventDefault();

        const logoutUser = async () => {
            const response = await fetchWithCSRF('/api/users/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) setCurrentUserId(null);
            history.push('/')
        }
        logoutUser();

    }

    const showLogin = e => {
        setAuthWindow(!authWindow)
    }

    return (
        <div className="navbar-div">
            <div>
                <NavLink exact to="/" activeClassName="is-selected">
                    <div className="nav-bar-image-container">
                        <img className="navbar-logo" src={getOutLogo} alt="The words get out with a door in the middle" />
                    </div>
                </NavLink>
            </div>
            <div>
                {currentUserId ?
                    <div className="navbar-rightside">
                        <div >
                            <a href="/profile">
                                <button className="navbar-button">My Adventures</button>
                            </a>
                        </div>
                        <div >
                            <button className="navbar-button" onClick={logOut}>Log Out</button>
                        </div>
                    </div> :
                    <div className="navbar-rightside">
                        <div >

                            <button className="navbar-button" onClick={showLogin} >Sign In</button>

                        </div>
                        <div>
                            <a href="/sign-up">
                                <button className="navbar-button">Sign Up</button>
                            </a>
                        </div>
                    </div>
                }
                <div className="login-window">
                    <ModalAuth closeWindow={showLogin} authWindow={authWindow} />
                </div>
            </div>

        </div>
    )
}

export default NavBar