import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clientimg from '../../images/client.png'
import Dashboard from '../common/Dashboard'
import TicketMessenger from './TicketMessenger'

const ClientDashboard = ({ loggedUser, messageFromWebSocket }) => {

    const navigate = useNavigate()

    if (localStorage.getItem("role") !== "client") {
        navigate("/login")
    }

    return (
        <>
            <Dashboard loggedUser={loggedUser} image={clientimg} />
            <TicketMessenger messageFromWebSocket={messageFromWebSocket} />
        </>
    )
}

export default ClientDashboard