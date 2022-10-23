import React from 'react'
import SearchBar from '../common/SearchBar'
import InsertUser from './InsertUser'
import UserElement from './UserElement'
import AdminNavigation from './AdminNavigation'

const UsersList = () => {

    const users = [
        {
            id: 1,
            name: "George Sigoiu",
            role: "administrator",
            devices: [

            ]
        },
        {
            id: 2,
            name: "Andrei Filimon",
            role: "client",
            devices: [

            ]
        },
        {
            id: 3,
            name: "Florin Agachi",
            role: "client",
            devices: [
                {
                    address: "Adresa 1",
                    description: "descr 1",
                    max_consumption: "max consumption 1"
                },
                {
                    address: "Adresa 2",
                    description: "descr 2",
                    max_consumption: "max consumption 2"
                },
                {
                    address: "Adresa 1",
                    description: "descr 1",
                    max_consumption: "max consumption 1"
                },
                {
                    address: "Adresa 2",
                    description: "descr 2",
                    max_consumption: "max consumption 2"
                },
                {
                    address: "Adresa 1",
                    description: "descr 1",
                    max_consumption: "max consumption 1"
                },
                {
                    address: "Adresa 2",
                    description: "descr 2",
                    max_consumption: "max consumption 2"
                },
                {
                    address: "Adresa 1",
                    description: "descr 1",
                    max_consumption: "max consumption 1"
                },
                {
                    address: "Adresa 2",
                    description: "descr 2",
                    max_consumption: "max consumption 2"
                },
                {
                    address: "Adresa 1",
                    description: "descr 1",
                    max_consumption: "max consumption 1"
                },
                {
                    address: "Adresa 2",
                    description: "descr 2",
                    max_consumption: "max consumption 2"
                },
                {
                    address: "Adresa 1",
                    description: "descr 1",
                    max_consumption: "max consumption 1"
                },
                {
                    address: "Adresa 2",
                    description: "descr 2",
                    max_consumption: "max consumption 2"
                },
                {
                    address: "Adresa 1",
                    description: "descr 1",
                    max_consumption: "max consumption 1"
                },
                {
                    address: "Adresa 2",
                    description: "descr 2",
                    max_consumption: "max consumption 2"
                }
            ]
        }
    ]

    const filters = [
        "clients", "administrators"
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