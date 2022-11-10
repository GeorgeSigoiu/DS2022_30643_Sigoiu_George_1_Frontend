import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { requestHandler } from '../handlers'
import { LINK_GET_DEVICES, getRequest, LINK_GET_DEVICES_FROM_USER } from '../requests'
import DeviceElement from './DeviceElement'
import InsertDevice from '../admin/InsertDevice'
import { useNavigate } from 'react-router-dom'

const DevicesList = ({ role, loggedUser }) => {

    const navigate = useNavigate()

    useEffect(() => {
        console.log("local storage: role=", localStorage.getItem("role"))
        if (localStorage.getItem("role") !== role) {
            navigate("/login")
        }
    }, [])

    const [devices, setDevices] = useState([])
    const [once, doOnce] = useState(false)

    useEffect(() => {

    }, [devices])

    useEffect(() => {
        getDevices()
    }, [once])


    async function getDevices() {
        let args
        if (role === "admin") {
            args = {
                link: LINK_GET_DEVICES,
                payload: {}
            }
        } else {
            args = {
                link: LINK_GET_DEVICES_FROM_USER + loggedUser.id,
                payload: {}
            }
        }
        const data = await requestHandler(getRequest, args)
        setDevices([...data])
    }

    const filters = [
        "address"
    ]

    return (
        <div id="devices_list" style={{ marginBottom: "2rem" }}>
            <div className='container'>
                {
                    role === "admin" &&
                    (<div style={{ display: "flex", justifyContent: "space-between" }}>
                        <SearchBar filters={filters} />
                        <InsertDevice devices={devices} setDevices={setDevices} />
                    </div>)
                }

                <div id="accordion-devices">
                    {
                        devices.map((el, index) => (
                            <DeviceElement device={el} key={index} devices={devices} setDevices={setDevices} role={role} />
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default DevicesList
