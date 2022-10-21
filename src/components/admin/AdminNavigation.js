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
                            <div type="button" className="btn btn-outline-primary">users</div>
                        </li>
                        <li id="devices-op">
                            <div type="button" className="btn btn-outline-primary">devices</div>
                        </li>
                        <li id="logout-op">
                            <div type="button" className="btn btn-outline-primary">log out</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminNavigation