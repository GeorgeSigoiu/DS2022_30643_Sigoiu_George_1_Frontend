import React from 'react'
import AdminNavigation from '../admin/AdminNavigation'
import ClientNavigation from '../client/ClientNavigation'

const Navigation = ({ setUserType }) => {

    const userType = localStorage.getItem("role")

    return (
        <>
            {
                userType === "admin" && (<AdminNavigation setUserType={setUserType} />)
            }
            {
                userType === "client" && (<ClientNavigation setUserType={setUserType} />)
            }
        </>
    )
}

export default Navigation