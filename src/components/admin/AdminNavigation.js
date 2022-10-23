import React from 'react'
import { Link } from 'react-router-dom'
import UserSticker from '../common/UserSticker'
import './admin_navigation.css'


const AdminNavigation = ({ setUserType }) => {

    function logoutAction() {
        console.log("logout")
        setUserType("")
    }

    return (
        <nav>
            <div id="admin-nav">
                <div className='container'>
                    <div className='sticker'>
                        <UserSticker userType="admin" />
                    </div>
                    <div className='admin-operations'>
                        <ul>
                            <li id="users-op">
                                <Link to="/admin/users">
                                    <div type="button" className="btn btn-outline-primary">users</div>
                                </Link>
                            </li>
                            <li id="devices-op">
                                <Link to="/admin/devices">
                                    <div type="button" className="btn btn-outline-primary">devices</div>
                                </Link>
                            </li>
                            <li id="logout-op">
                                <Link to="/login">
                                    <div type="button" className="btn btn-outline-primary" onClick={logoutAction}>log out</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default AdminNavigation