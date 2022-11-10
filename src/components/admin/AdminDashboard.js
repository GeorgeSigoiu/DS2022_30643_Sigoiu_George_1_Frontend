import React from 'react'
import Dashboard from '../common/Dashboard'
import adminimg from '../../images/manager.png'

const AdminDashboard = ({ loggedUser }) => {

    return (
        <Dashboard loggedUser={loggedUser} image={adminimg} />
    )
}

export default AdminDashboard