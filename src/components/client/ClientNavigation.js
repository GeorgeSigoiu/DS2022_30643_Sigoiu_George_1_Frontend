import React from 'react'
import UserSticker from '../common/UserSticker'
import { Link } from 'react-router-dom'
import '../common/navigation.css'

const ClientNavigation = ({ setUserType }) => {

    function logoutAction() {
        setUserType("")
    }

    return (
        <nav>
            <div id="common-nav">
                <div className='container'>
                    <div className='sticker'>
                        <UserSticker userType="client" />
                    </div>
                    <div className='operations'>
                        <ul>
                            <li id="users-op">
                                <Link to="/user/settings">
                                    <div type="button" className="btn btn-outline-primary">settings</div>
                                </Link>
                            </li>
                            <li id="users-op">
                                <Link to="/client/devices">
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

export default ClientNavigation