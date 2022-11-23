import React, { useEffect, useState } from 'react'
import { requestHandler } from '../../handlers';
import { getRequest, LINK_GET_DEVICES_WITH_CONSUMPTION_EXCEEDED } from '../../requests';
import WebSocket from '../WebSocket'

const NavbarElem_notificationBell = () => {
    const [message, setMessage] = useState({});
    const [notifications, setNotifications] = useState([])

    async function getDevicesWithConsumptionExceeded() {
        const username = localStorage.getItem("username")
        const response = await requestHandler(getRequest, {
            link: LINK_GET_DEVICES_WITH_CONSUMPTION_EXCEEDED + username,
            payload: {}
        })
        setNotifications(response)
    }

    useEffect(() => {
        // get the devices that passed the limit
        // sub forma: limita depasita {value}, adresa
        getDevicesWithConsumptionExceeded()
    }, [])


    useEffect(() => {
        console.log("Got the new message: ", message)
        let newMessage = true
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].address === message.address) {
                newMessage = false
            }
        }
        if (newMessage) {
            setNotifications([...notifications, message])
        }
    }, [message])

    return (
        <>
            <li id="notification-bell" /*onMouseEnter={e => onMouseEnter(e)}*/>
                <div className="notification-icon">
                    <i class="fa-solid fa-bell"></i>
                    <span id="notification-badge" className='badge'>{notifications.length > 0 ? notifications.length : ""}</span>
                </div>
                <div className="notifications">
                    {
                        notifications.map((el, index) => (
                            <div className="notification-elem" key={index}>
                                <p>
                                    {el.address}
                                    <br />
                                    Exceeded max consumption: {el.max_consumption}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </li>
            <WebSocket message={message} setMessage={setMessage} />
        </>
    )
}

export default NavbarElem_notificationBell