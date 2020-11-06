import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import getOutLogo from '../assets/getOut.png'
import AuthContext from '../auth'

const NavBar = () => {

    const { fetchWithCSRF, setCurrentUserId, currentUserId } = useContext(AuthContext);

    function logOut(e) {
        e.preventDefault();
        // Make the following an IIFE?
        const logoutUser = async () => {
            const response = await fetchWithCSRF('/api/users/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) setCurrentUserId(null);
        }
        logoutUser();

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
                    <div >
                        <button className="navbar-button" onClick={logOut}>Log Out</button>
                    </div> :
                    <div>
                        <div >
                            <a href="/signin">
                                <button>Sign In</button>
                            </a>
                        </div>
                        <div>
                            <a href="/sign-up">
                                <span>Sign Up</span>
                            </a>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar