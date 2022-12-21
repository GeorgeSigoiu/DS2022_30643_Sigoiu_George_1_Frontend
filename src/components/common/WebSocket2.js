import React from 'react';
import SockJsClient from 'react-stomp'
import TicketMessenger from '../client/TicketMessenger';
import { requestHandler } from '../handlers';
import { LINK_WS_CONNECTED, postRequest } from '../requests';

const SOCKET_URL = 'http://20.170.66.16:7900/ws-message';
// const SOCKET_URL = 'http://localhost:7901/ws-message';

/**
 * Used for receiving private messages from admins or from clients 
 */
const WebSocket = ({ userType, setMessageFromWebsocket }) => {

    window.onbeforeunload = function (e) {
        // e = e || window.event;

        // // For IE and Firefox prior to version 4
        // if (e) {
        //     e.returnValue = 'Sure?';
        // }

        // // For Safari
        // return 'Sure?';
    };

    let onConnected = () => {
        console.log("Connected!!")
        requestHandler(postRequest, {
            link: LINK_WS_CONNECTED,
            payload: localStorage.getItem("username")
        })
    }

    let onDisconnect = () => {
        console.log("Disconnect WS")
    }

    let onMessageReceived = (msg) => {
        setMessageFromWebsocket(msg)
    }

    let topics;
    if (userType === "admin") {
        topics = ["/topic/messages", "/user/" + localStorage.getItem("username") + "/chat"]
    } else if (userType === "client") {
        topics = ["/user/" + localStorage.getItem("username") + "/chat"]
    }

    return (
        <div>
            <SockJsClient
                url={SOCKET_URL}
                topics={topics}
                onConnect={onConnected}
                onDisconnect={onDisconnect}
                onMessage={msg => onMessageReceived(msg)}
            />
        </div>
    );
}

export default WebSocket;