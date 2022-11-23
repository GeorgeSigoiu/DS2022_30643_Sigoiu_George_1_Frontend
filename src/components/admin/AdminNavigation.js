import React from 'react'
import { Link } from 'react-router-dom'
import UserSticker from '../common/UserSticker'
import '../common/navigation.css'
import NavbarElem_notificationBell from '../common/navigation/NavbarElem_notificationBell'
import NavbarElem_logout from '../common/navigation/NavbarElem_logout'


const AdminNavigation = ({ setUserType }) => {

    return (
        <nav>
            <div id="common-nav">
                <div className='container'>
                    <div className='sticker'>
                        <UserSticker userType="admin" />
                    </div>
                    <div className='operations'>
                        <ul>
                            <li id="users-op">
                                <Link to="/user/settings">
                                    <div type="button" className="btn btn-outline-primary">settings</div>
                                </Link>
                            </li>
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
                            <NavbarElem_notificationBell />
                            <NavbarElem_logout setUserType={setUserType} />
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavigation