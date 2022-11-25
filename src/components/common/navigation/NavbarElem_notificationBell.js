import React, { useEffect, useState } from 'react'
import { requestHandler } from '../../handlers';
import { getRequest, LINK_GET_DEVICES_WITH_CONSUMPTION_EXCEEDED } from '../../requests';
import WebSocket from '../WebSocket'

const NavbarElem_notificationBell = ({ message }) => {
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
        getDevicesWithConsumptionExceeded()
    }, [])


    useEffect(() => {
        if (!notifications.includes(message)) {
            setNotifications([...notifications, message])
        }
    }, [message])

    function deleteNotification(index) {
        let newNotif = notifications
        newNotif.splice(index, 1)
        setNotifications([...newNotif])
    }

    return (
        <>
            <li id="notification-bell" /*onMouseEnter={e => onMouseEnter(e)}*/>
                <div className="notification-icon">
                    <i className="fa-solid fa-bell"></i>
                    <span id="notification-badge" className='badge'>{notifications.length > 0 ? notifications.length : ""}</span>
                </div>
                <div className="notifications">
                    {
                        notifications.map((el, index) => (
                            <div className="notification-elem d-flex" key={index}>
                                <p>
                                    Address: {el.address}
                                    <br />
                                    date: {el.date}, {el.time}:00
                                </p>
                                <div style={{ cursor: "pointer" }} onClick={() => deleteNotification(index)}>
                                    X
                                </div>
                            </div>
                        ))
                    }
                </div>
            </li>
        </>
    )
}

export default NavbarElem_notificationBell