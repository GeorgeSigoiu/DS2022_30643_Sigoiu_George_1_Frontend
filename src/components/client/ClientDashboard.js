import React from 'react'
import clientimg from '../../images/client.png'
import Dashboard from '../common/Dashboard'

const ClientDashboard = ({ loggedUser }) => {
    return (
        <Dashboard loggedUser={loggedUser} image={clientimg} />
    )
}

export default ClientDashboard