import React from 'react'
import { Link } from 'react-router-dom'

const NavbarElem_logout = ({ setUserType }) => {

    function logoutAction() {
        setUserType("")
        localStorage.setItem("role", "")
        localStorage.setItem("username", "")
    }

    return (
        <li id="logout-op">
            <Link to="/login">
                <div type="button" className="btn btn-outline-primary" onClick={logoutAction}>log out</div>
            </Link>
        </li>
    )
}

export default NavbarElem_logout