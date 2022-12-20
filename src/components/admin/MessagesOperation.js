import React, { useEffect, useState } from 'react'
import '../../css/admin_messages.css'
import { requestHandler } from '../handlers'
import { getRequest, LINK_ASSIGN_ADMIN_TO_TICKET, LINK_GET_TICKET, LINK_GET_TICKETS, LINK_GET_TICKETS_NUMBER_UNASSIGNED, LINK_READ_MESSAGES, LINK_SEND_MESSAGE_TO_CLIENT, LINK_SET_TYPING, postRequest, putRequest } from '../requests'

const MessagesOperation = ({ messageFromWebSocket }) => {

    const [doOnce, setDoOnce] = useState(true)
    const [tickets, setTickets] = useState([])

    async function increaseChatMessagesNumber(username) {
        const chat = document.getElementById(`ticket-username-${username}`)
        const span = chat.querySelector("span")
        if (span.innerHTML === "") {
            span.innerHTML = 1
        } else {
            span.innerHTML = Number(span.innerHTML) + 1
        }

        // let divs = conversations.querySelectorAll("div")
        // for (let i = 0; i < divs.length; i++) {
        //     let div = divs[i]
        //     let content = div.innerHTML
        //     if (content.startsWith(`${username} #`)) {
        //         let span = div.querySelector("span")
        //         let numberMessages = span.innerHTML
        //         if (numberMessages === "") {
        //             span.innerHTML = 1
        //         } else {
        //             span.innerHTML = Number(numberMessages) + 1
        //         }
        //         break
        //     }
        // }
    }

    async function setToZeroUnreadMessagesFor(username) {
        const chat = document.getElementById(`ticket-username-${username}`)
        const span = chat.querySelector("span")
        span.innerHTML = ""
    }

    async function deleteConversationDiv(username) {
        const chat = document.getElementById(`ticket-username-${username}`)
        chat.parentNode.removeChild(chat)
    }

    async function readMessages(username) {
        requestHandler(putRequest, {
            link: LINK_READ_MESSAGES,
            payload: {
                client_username: username,
                userType: "admin"
            }
        })
        setToZeroUnreadMessagesFor(username)
    }

    useEffect(() => {
        console.log("message for admin", messageFromWebSocket)
        if (messageFromWebSocket === "") return
        deleteMessageCheck()
        if (messageFromWebSocket === "new topic added") {
            const span = document.querySelector("#chat-get-ticket span")
            const lastVal = Number(span.innerHTML)
            span.innerHTML = lastVal + 1
        }
        else if (messageFromWebSocket === "topic retrieved") {
            //to do check
            const span = document.querySelector("#chat-get-ticket span")
            const lastVal = Number(span.innerHTML)
            if (lastVal > 0) {
                span.innerHTML = lastVal - 1
            }
        } else if (messageFromWebSocket === "messages read") {
            //set the icon to messages read
            addMessageCheck()
        } else if (messageFromWebSocket === "is typing") {
            showTypingDiv()
        } else if (messageFromWebSocket === "not typing") {
            hideTypingDiv()
        }
        else {
            const date0 = messageFromWebSocket.timestamp
            const date = date0.substring(0, date0.length - 5)
            const headerUsername = document.querySelector("#chat-message-header .chat-username").innerHTML
            //if message is added in selected chat
            if (headerUsername === messageFromWebSocket.username) {
                console.log("current chat")
                //add the message
                addDivMessage("Client", messageFromWebSocket.text, date)
                //set the message seen
                readMessages(headerUsername)
                hideTypingDiv()
            }
            //else added in another chat
            else {
                console.log("another chat")
                const username = messageFromWebSocket.username
                increaseChatMessagesNumber(username)
            }
        }
    }, [messageFromWebSocket])

    async function showChat(id) {
        deleteMessageCheck()
        const ticket = await requestHandler(getRequest, {
            link: LINK_GET_TICKET + id,
            payload: {}
        })
        let messages = ticket.messages
        messages = messages.sort(sortMessagesByTimestamp)

        const messageContent = document.getElementById("chat-message-content")
        removeChildren(messageContent)
        messageContent.classList.remove("opacity-0")

        document.getElementById("chat-message-input").classList.remove("opacity-0")

        const messageHeader = document.getElementById("chat-message-header")
        messageHeader.classList.remove("opacity-0")
        messageHeader.querySelector(".chat-username").innerHTML = ticket.clientUsername

        let lastMessage;

        messages.forEach(message => {
            if (message.userType === "admin") {
                addDivMessage("Me", message.text, message.timestamp)
            } else {
                addDivMessage("Client", message.text, message.timestamp)
            }
            lastMessage = message
        })

        readMessages(ticket.clientUsername)
        if (lastMessage.userType === "admin" && lastMessage.read === 1) {
            addMessageCheck()
        }
    }

    function addDivMessage(person, text, time) {
        let divOutsite = document.createElement("div");
        divOutsite.classList.add("rounded", "shadow-sm", "border", "w-75", "d-flex", "flex-column", "px-3", "py-1", "mt-2")
        let divName = document.createElement("div");
        divName.classList.add("text-bold")

        let divTime = document.createElement("div");
        divTime.classList.add("align-self-end")
        divTime.innerHTML = time

        let text2 = text.replaceAll('\n', "<br/>")
        let divText = document.createElement("div");
        divText.innerHTML = text2
        if (person === "Me") {
            divName.innerHTML = "Me"
        } else {
            divOutsite.classList.add("align-self-end")
            divName.innerHTML = person
        }

        divOutsite.appendChild(divName)
        divOutsite.appendChild(divText)
        divOutsite.appendChild(divTime)

        const messageContentDiv = document.getElementById("chat-message-content")
        messageContentDiv.appendChild(divOutsite)
        setTimeout(() => {
            messageContentDiv.scrollTo(0, messageContentDiv.scrollHeight);
        }, 300)
    }

    function sortMessagesByTimestamp(m1, m2) {
        let date1 = Date.parse(m1.timestamp)
        let date2 = Date.parse(m2.timestamp)
        return date1 < date2
    }

    async function setMessages() {
        const tickets = await requestHandler(getRequest, {
            link: LINK_GET_TICKETS + localStorage.getItem("username"),
            payload: {}
        })
        setTickets([...tickets])
        const conversations = document.getElementById("chat-conversations")
        removeChildren(conversations)
        tickets.forEach(element => {
            const id = element.id
            const username = element.clientUsername
            addConversation(id, username, element.unreadMessagesNumber)
        });
        const numberTickets = await requestHandler(getRequest, {
            link: LINK_GET_TICKETS_NUMBER_UNASSIGNED,
            payload: {}
        })
        document.querySelector("#chat-get-ticket span").innerHTML = numberTickets
    }

    useEffect(() => {
        setMessages()
        const conversations = document.getElementById("chat-conversations")
        const messagesContent = document.getElementById("chat-message-body")
        const button = document.getElementById("chat-get-ticket")
        messagesContent.style.height = `${conversations.clientHeight + button.clientHeight}px`
    }, [doOnce])

    useEffect(() => {

    }, [tickets])

    function removeChildren(cont) {
        var child = cont.lastElementChild;
        while (child) {
            cont.removeChild(child);
            child = cont.lastElementChild;
        }
    }

    async function sendMessage() {
        const textarea = document.getElementById("chat-message-input").querySelector("textarea")
        const text = textarea.value
        if (text.length === 0) return
        setTimeout(() => {
            textarea.value = ""
        }, 30)
        requestHandler(postRequest, {
            link: LINK_SEND_MESSAGE_TO_CLIENT,
            payload: {
                username: document.querySelector("#chat-message-header .chat-username").innerHTML,
                message: text,
                admin: "admin"
            }
        })
        const date0 = new Date().toISOString()
        const date = date0.substring(0, date0.length - 5)
        addDivMessage("Me", text, date)

        deleteMessageCheck()
    }

    function onKeyDownInput(key) {
        if (key.keyCode === 13 && key.shiftKey) {
            //will add autimatically the new line
        }
        else if (key.code === "Enter") {
            sendMessage()
            return
        }
        const value = key.currentTarget.value
        if (value.length > 0) {
            console.log("send typing message")
            requestHandler(postRequest, {
                link: LINK_SET_TYPING,
                payload: {
                    client_username: document.querySelector("#chat-message-header .chat-username").innerHTML,
                    action: "yes",
                    userType: "admin"
                }
            })
        } else {
            console.log("stop typing message")
            requestHandler(postRequest, {
                link: LINK_SET_TYPING,
                payload: {
                    client_username: document.querySelector("#chat-message-header .chat-username").innerHTML,
                    action: "no",
                    userType: "admin"
                }
            })
        }

    }

    async function getNewTicket() {
        const span = document.querySelector("#chat-get-ticket span")
        const lastVal = Number(span.innerHTML)
        if (lastVal - 1 < 0) {

        } else {
            span.innerHTML = lastVal - 1
            const topic = await requestHandler(postRequest, {
                link: LINK_ASSIGN_ADMIN_TO_TICKET,
                payload: localStorage.getItem("username")
            })
            const topicId = topic.id
            const clientUsername = topic.clientUsername
            console.log(topic)
            addConversation(topicId, clientUsername, topic.unreadMessagesNumber)
        }
    }

    function addConversation(id, username, unreadMessagesNumber) {
        console.log("unread", unreadMessagesNumber)
        let newDiv = document.createElement("div")
        newDiv.classList.add("border", "py-2", "px-4", "room", "overflow-not-allowed")
        newDiv.id = "ticket-username-" + username
        newDiv.innerHTML = username + " #" + id + `<span class="badge bg-info ms-2">${unreadMessagesNumber}</span>`
        newDiv.addEventListener("click", () => { showChat(id) })
        const conversations = document.getElementById("chat-conversations")
        conversations.appendChild(newDiv)
    }

    function addMessageCheck() {
        try {
            const checkMessageSend = document.getElementById("check-message-send")
            if (checkMessageSend !== null) {
                return
            }
        } catch (e) { }
        let div1 = document.createElement("div")
        div1.classList.add("bg-white")
        div1.id = "check-message-send"
        div1.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
        document.getElementById("chat-message-content").appendChild(div1)
        const messageContentDiv = document.getElementById("chat-message-content")
        messageContentDiv.scrollTo(0, messageContentDiv.scrollHeight);
    }

    function deleteMessageCheck() {
        try {
            const check = document.getElementById("check-message-send")
            check.parentNode.removeChild(check)
        } catch (e) {

        }
    }

    function showTypingDiv() {
        document.getElementById("typing-div").style.display = "block"
    }

    function hideTypingDiv() {
        document.getElementById("typing-div").style.display = "none"
    }

    function closeTicket() {
        const username = document.querySelector("#chat-message-header .chat-username").innerHTML
        requestHandler(postRequest, {
            link: LINK_SEND_MESSAGE_TO_CLIENT,
            payload: {
                username: username,
                message: "",
                admin: "solved"
            }
        })
        const messageContent = document.getElementById("chat-message-content")
        removeChildren(messageContent)
        messageContent.classList.add("opacity-0")
        deleteConversationDiv(username)
        document.getElementById("chat-message-input").classList.add("opacity-0")
        const messageHeader = document.getElementById("chat-message-header")
        messageHeader.classList.add("opacity-0")
        messageHeader.querySelector(".chat-username").innerHTML = ""
    }

    return (
        <div id="chat">
            <div className="container py-4" id="chat-page">
                <div className="row" style={{ height: "100%" }}>

                    <div className="col-md-4 d-flex flex-column bg-whitesmoke " style={{ padding: "0rem" }} id="conversations">

                        <div className="d-flex justify-content-between border py-2 px-4" id="chat-conversation-header">
                            <div>
                                {localStorage.getItem("username")}
                            </div>
                        </div>

                        <div id="chat-get-ticket" className='d-flex my-1'>
                            <button className='btn btn-primary mx-auto' onClick={getNewTicket}>Get ticket <span class="badge bg-danger">0</span></button>
                        </div>

                        <div className="overflow-allowed-y" id="chat-conversations">

                        </div>
                    </div>

                    <div className="col-md-8 bg-lightgrey" style={{ padding: "0rem" }} id="chat-messages">

                        <div className="d-flex justify-content-between border py-1 px-4 opacity-0" id="chat-message-header">
                            <div className='chat-username align-self-center'>
                                client username
                            </div>
                            <div>
                                <button className='btn btn-outline-primary py-1 px-2' onClick={closeTicket}>Close ticket</button>
                            </div>
                        </div>

                        <div className="d-flex flex-column" id="chat-message-body">
                            <div className="rounded hidden" style={{ position: "absolute", right: "2rem", bottom: "6rem", zIndex: "102", backgroundColor: "aquamarine", width: "30px", height: "30px", cursor: "pointer" }} id="scroll-down">
                                <div className="m-auto" >
                                    <i className="fa-solid fa-arrow-down" ></i>
                                </div>
                            </div>

                            <div className="px-2 py-2 bg-white align-self-stretch d-flex flex-column opacity-0" id="chat-message-content">

                            </div>

                            <div className="px-2 py-2 border bg-whitesmoke opacity-0 d-flex" id="chat-message-input">
                                <div style={{ display: "none", position: "absolute", width: "100px", height: "30px", zIndex: "30", left: "0", top: "0", transform: "translate(50px,-100%)" }} className="bg-whitesmoke border hide" id="typing-div">
                                    <div className='ms-2 pt-1'>
                                        is typing <i class="fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <textarea style={{ display: "inline", width: "90%", maxHeight: "6rem" }} className="rounded form-control" placeholder="Write message..." id="chat-message-input" onKeyUp={onKeyDownInput}></textarea>
                                <i className="fa-solid fa-paper-plane px-2 py-2 my-auto" style={{ display: "inline", cursor: "pointer" }} id="chat-message-btn-send" onClick={sendMessage}></i>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesOperation