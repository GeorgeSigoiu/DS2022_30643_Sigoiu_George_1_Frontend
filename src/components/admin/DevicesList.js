import React, { useState, useEffect } from 'react'
import SearchBar from '../common/SearchBar'
import { LINK_GET_DEVICES, getRequest } from '../requests'
import DeviceElement from './DeviceElement'
import InsertDevice from './InsertDevice'

const DevicesList = ({ tokens, setTokens }) => {

    const [devices, setDevices] = useState([])
    const [once, doOnce] = useState(false)

    useEffect(() => {

    }, [devices])

    useEffect(() => {
        getDevices()
        console.log("getDevices()")
    }, [once])


    async function getDevices() {
        const data = await getRequest(LINK_GET_DEVICES, tokens[0], {})
        setDevices(data)
        console.log(data)
    }

    const filters = [
        "address"
    ]

    return (
        <div id="devices_list" style={{ marginBottom: "2rem" }}>
            <div className='container'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SearchBar filters={filters} />
                    <InsertDevice tokens={tokens} setTokens={setTokens} devices={devices} setDevices={setDevices} />
                </div>
                <div id="accordion-devices">
                    {
                        devices.map((el, index) => (
                            <DeviceElement device={el} key={index} tokens={tokens} setTokens={setTokens} devices={devices} setDevices={setDevices} />
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default DevicesList
