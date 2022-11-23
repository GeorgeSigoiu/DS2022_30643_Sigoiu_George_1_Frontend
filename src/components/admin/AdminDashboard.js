import React, { useEffect } from 'react'
import Dashboard from '../common/Dashboard'
import adminimg from '../../images/manager.png'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = ({ loggedUser }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("role") !== "admin") {
            navigate("/login")
        }
    }, [])

    return (
        <Dashboard loggedUser={loggedUser} image={adminimg} />
    )
}

export default AdminDashboard