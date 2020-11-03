import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    return (
        <div className="navbar-div">
            <div>
                <NavLink exact to="/" activeClassName="is-selected">Logo Placeholder/Home</NavLink>
            </div>

        </div>
    )
}

export default NavBar