import React from 'react'
import UserSticker from '../common/UserSticker'
import './admin_navigation.css'
const AdminNavigation = () => {

    return (
        <div id="admin-nav">
            <div className='container'>
                <div className='sticker'>
                    <UserSticker userType="admin" />
                </div>
                <div className='admin-operations'>
                    <ul>
                        <li id="users-op">
                            <button type="button" className="btn btn-outline-primary">users</button>
                        </li>
                        <li id="devices-op">
                            <button type="button" className="btn btn-outline-primary">devices</button>
                        </li>
                        <li id="logout-op">
                            <button type="button" className="btn btn-outline-primary">log out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminNavigation