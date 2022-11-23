import React, { useState } from 'react';
import SockJsClient from 'react-stomp'

const SOCKET_URL = 'http://localhost:7900/ws-message';

const WebSocket = ({ setMessage }) => {

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        const content = msg.message
        const obj = JSON.parse(content)
        setMessage(obj);
    }

    return (
        <div>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/message']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
            />
        </div>
    );
}

export default WebSocket;