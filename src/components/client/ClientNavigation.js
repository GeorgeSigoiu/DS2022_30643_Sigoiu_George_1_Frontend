import React from 'react'
import UserSticker from '../common/UserSticker'
import { Link } from 'react-router-dom'
import '../common/navigation.css'
import NavbarElem_notificationBell from '../common/navigation/NavbarElem_notificationBell'
import NavbarElem_logout from '../common/navigation/NavbarElem_logout'

const ClientNavigation = ({ setUserType }) => {

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
                            <NavbarElem_notificationBell />
                            <NavbarElem_logout setUserType={setUserType} />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default ClientNavigation