import React, { useState, useEffect } from 'react'
import SearchBar from '../common/SearchBar'
import InsertUser from './InsertUser'
import UserElement from './UserElement'
import { getRequest, isTokenExpiredError, LINK_GET_DEVICES_WITHOUT_OWNER, LINK_GET_USERS, tryRefreshTokens } from '../requests'
import { useNavigate } from 'react-router-dom'
import { requestHandler } from '../handlers'

const UsersList = ({ tokens, setTokens }) => {
    const [users, setUsers] = useState([])
    const [devices, setDevices] = useState([])
    const [once, doOnce] = useState(false)

    useEffect(() => {

    }, [users])

    useEffect(() => {

    }, [devices])

    useEffect(() => {
        getUsers()
        getDevices()
    }, [once])


    async function getUsers() {
        const data = await requestHandler(getRequest, {
            link: LINK_GET_USERS,
            payload: {}
        }, tokens, setTokens)
        setUsers(data)
    }

    async function getDevices() {
        const data = await requestHandler(getRequest, {
            link: LINK_GET_DEVICES_WITHOUT_OWNER,
            payload: {}
        }, tokens, setTokens)
        setDevices(data)
    }

    const filters = [
        "clients", "admins"
    ]

    return (
        <div id="users_list" style={{ marginBottom: "2rem" }}>
            <div className='container'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SearchBar filters={filters} tokens={tokens} />
                    <InsertUser tokens={tokens} setTokens={setTokens} users={users} setUsers={setUsers} />
                </div>
                <div id="accordion-users">
                    {
                        users.map((el, index) => (
                            <UserElement user={el} key={index} tokens={tokens} setTokens={setTokens} users={users} setUsers={setUsers} devices={devices} setDevices={setDevices} />
                        ))
                    }
                </div>

            </div>
        </div>

    )
}

export default UsersList