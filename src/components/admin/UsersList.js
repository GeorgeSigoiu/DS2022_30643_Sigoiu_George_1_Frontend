import React from 'react'
import SearchBar from '../common/SearchBar'
import UserElement from './UserElement'

const UsersList = () => {

    const users = [
        {
            id: 1,
            name: "George Sigoiu",
            role: "administrator"
        },
        {
            id: 2,
            name: "Andrei Filimon",
            role: "client"
        },
        {
            id: 3,
            name: "Florin Agachi",
            role: "client"
        }
    ]

    return (
        <div id="users_list">
            <div className='container'>
                <div>
                    <SearchBar />
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