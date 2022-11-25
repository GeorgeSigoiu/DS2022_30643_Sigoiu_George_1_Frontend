import React from 'react'
import AdminNavigation from '../admin/AdminNavigation'
import ClientNavigation from '../client/ClientNavigation'

const Navigation = ({ setUserType, message }) => {

    const userType = localStorage.getItem("role")

    return (
        <>
            {
                userType === "admin" && (<AdminNavigation setUserType={setUserType} message={message} />)
            }
            {
                userType === "client" && (<ClientNavigation setUserType={setUserType} message={message} />)
            }
        </>
    )
}

export default Navigation