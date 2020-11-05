import React from 'react'
import { NavLink } from 'react-router-dom';
import getOutLogo from '../assets/getOut.png'

const NavBar = ({ currentUserId }) => {

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
                    <div>
                        <a href="/logout">
                            <span>Log Out</span>
                        </a>
                    </div> :
                    <div>
                        <div>
                            <a href="/signin">
                                <span>Sign In</span>
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