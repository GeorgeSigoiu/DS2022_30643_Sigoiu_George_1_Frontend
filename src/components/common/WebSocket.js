import React from 'react';
import SockJsClient from 'react-stomp'

const SOCKET_URL = 'http://20.170.66.16:7900/ws-message';
// const SOCKET_URL = 'http://localhost:7901/ws-message';

/**
 * Used for receiving from backend the consumption for 
 */
const WebSocket = ({ setMessage, setNewConsumption, username }) => {


    let onConnected = () => {
        console.log("Connected for devices consumption!!")
    }

    let onDisconnect = () => {
        console.log("Disconnect")
    }

    let onMessageReceived = (msg) => {
        const content1 = msg.message_exceeded_consumption
        const content2 = msg.device_consumption
        setNewConsumption(content2)
        const obj = JSON.parse(content1)
        if (JSON.stringify(obj) !== "{}") {
            setMessage(obj);
        }
    }

    return (
        <div>
            {
                username !== "" &&
                (
                    <SockJsClient
                        url={SOCKET_URL}
                        topics={["/user/" + localStorage.getItem("username") + "/private"]}
                        onConnect={onConnected}
                        onDisconnect={onDisconnect}
                        onMessage={msg => onMessageReceived(msg)}
                    />
                )
            }

        </div>
    );
}

export default WebSocket;