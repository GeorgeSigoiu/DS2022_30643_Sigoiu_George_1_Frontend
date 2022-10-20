import React from 'react'
import AdminNavigation from './AdminNavigation'
import UsersList from './UsersList'

const AdminDashboard = () => {
    return (
        <div>
            <AdminNavigation />
            <UsersList />
        </div>
    )
}

export default AdminDashboard