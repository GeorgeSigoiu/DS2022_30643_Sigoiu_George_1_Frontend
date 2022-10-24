import React, { useState, useEffect } from 'react'
import SearchBar from '../common/SearchBar'
import InsertUser from './InsertUser'
import UserElement from './UserElement'
import { getRequest, LINK_GET_USERS } from '../requests'

const UsersList = () => {

    const [users, setUsers] = useState([])
    const [once, doOnce] = useState(false)

    useEffect(() => {

    }, [users])

    useEffect(() => {
        getUsers()
        console.log("getUsers()")
    }, [once])


    async function getUsers() {
        const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaWNhIiwicm9sZXMiOlsiYWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3OTAwL2xvZ2luIiwiZXhwIjoxNjY2NjM3NDM5fQ.8EEqLMgr2hR7viqLBYVTxrKo4x_ts1xKBTkhNJc2M4k"
        const data = await getRequest(LINK_GET_USERS, access_token)
        setUsers(data)
    }

    const filters = [
        "clients", "admins"
    ]

    return (
        <div id="users_list">
            <div className='container'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SearchBar filters={filters} />
                    <InsertUser />
                </div>
                <div id="accordion">
                    {
                        users.map((el, index) => (
                            <UserElement user={el} key={index} />
                        ))
                    }
                </div>

            </div>
        </div>

    )
}

export default UsersList