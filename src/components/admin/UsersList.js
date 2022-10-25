import React, { useState, useEffect } from 'react'
import SearchBar from '../common/SearchBar'
import InsertUser from './InsertUser'
import UserElement from './UserElement'
import { getRequest, LINK_GET_USERS } from '../requests'

const UsersList = ({ tokens, setTokens }) => {

    const [users, setUsers] = useState([])
    const [once, doOnce] = useState(false)

    useEffect(() => {

    }, [users])

    useEffect(() => {
        getUsers()
        console.log("getUsers()")
    }, [once])


    async function getUsers() {
        const data = await getRequest(LINK_GET_USERS, tokens[0])
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
                    <InsertUser tokens={tokens} setTokens={setTokens} users={users} setUsers={setUsers} />
                </div>
                <div id="accordion">
                    {
                        users.map((el, index) => (
                            <UserElement user={el} key={index} tokens={tokens} setTokens={setTokens} users={users} setUsers={setUsers} />
                        ))
                    }
                </div>

            </div>
        </div>

    )
}

export default UsersList