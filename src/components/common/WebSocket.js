import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp'

const SOCKET_URL = 'http://20.52.196.84:7900/ws-message';
// const SOCKET_URL = 'http://localhost:7901/ws-message';

const WebSocket = ({ setMessage, setNewConsumption, username }) => {

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        console.log("Got the message: ", msg)
        const content1 = msg.message_exceeded_consumption
        const content2 = msg.device_consumption
        setNewConsumption(content2)
        const obj = JSON.parse(content1)
        if (JSON.stringify(obj) !== "{}") {
            console.log("add obj: ", obj)
            setMessage(obj);
        }
    }

    useEffect(() => {
        console.log("username", username)
        console.log("username ls", localStorage.getItem("username"))
    }, [username])

    return (
        <div>
            {
                username !== "" &&
                (
                    <SockJsClient
                        url={SOCKET_URL}
                        topics={['/topic/message', "/user/" + localStorage.getItem("username") + "/private"]}
                        onConnect={onConnected}
                        onDisconnect={console.log("Disconnected!")}
                        onMessage={msg => onMessageReceived(msg)}
                    />
                )
            }

        </div>
    );
}

export default WebSocket;