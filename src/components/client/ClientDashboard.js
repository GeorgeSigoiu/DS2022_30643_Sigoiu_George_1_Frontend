import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clientimg from '../../images/client.png'
import Dashboard from '../common/Dashboard'

const ClientDashboard = ({ loggedUser }) => {

    const navigate = useNavigate()

    useEffect(() => {
        console.log("local storage: role=", localStorage.getItem("role"))
        if (localStorage.getItem("role") === "admin") {
            navigate("/login")
        }
    }, [])
    return (
        <Dashboard loggedUser={loggedUser} image={clientimg} />
    )
}

export default ClientDashboard