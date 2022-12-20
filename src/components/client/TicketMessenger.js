import React, { useEffect, useState } from 'react'
import '../../css/ticket_messenger.css'
import { requestHandler } from '../handlers'
import { getRequest, LINK_CLOSE_TICKET, LINK_GET_TICKET_MESSAGES, LINK_READ_MESSAGES, LINK_SEND_MESSAGE_TO_ADMIN, LINK_SET_TYPING, postRequest, putRequest } from '../requests'

const TicketMessenger = ({ messageFromWebSocket }) => {

    useEffect(() => {
        console.log("mesage for client", messageFromWebSocket)
        if (messageFromWebSocket === "") {
            return
        }
        deleteMessageCheck()
        if (messageFromWebSocket === "messages read") {
            //set icon in chat content
            addMessageCheck()
        } else if (messageFromWebSocket === "is typing") {
            showTypingDiv()
        } else if (messageFromWebSocket === "not typing") {
            hideTypingDiv()
        }
        else {
            const ticketMessages = document.getElementById("ticket-messages")
            if (messageFromWebSocket.userType === "solved") {
                ticketMessages.appendChild(createFinishedTicketAcknowledge())
                document.getElementById("ticket-input").classList.add("disabled")
                return
            }
            let div = createMessageDiv("admin", messageFromWebSocket.text)
            ticketMessages.appendChild(div)
            ticketMessages.scrollTo(0, ticketMessages.scrollHeight)
            if (messengerShow) {
                //set unread messages to 0
                readMessages()
                hideTypingDiv()
            } else {
                //increase the number of unread messages
            }
        }

    }, [messageFromWebSocket])

    const [messengerShow, setShowMessenger] = useState(false)

    useEffect(() => {
        uploadConversation()
    }, [])

    async function readMessages() {
        const messagesContent = document.getElementById("ticket-messages")
        if (messagesContent.children.length < 2) {
            return
        }
        requestHandler(putRequest, {
            link: LINK_READ_MESSAGES,
            payload: {
                client_username: localStorage.getItem("username"),
                userType: "client"
            }
        })
    }

    async function getMessages() {
        console.log("get messages for ", localStorage.getItem("username"))
        return await requestHandler(getRequest, {
            link: LINK_GET_TICKET_MESSAGES + localStorage.getItem("username"),
            payload: {}
        })
    }

    async function uploadConversation() {
        const messages = await getMessages()
        const ticketMessages = document.getElementById("ticket-messages")
        removeAllChildNodes(ticketMessages)
        const firstElem = createFirstDivElemFromMessages()
        ticketMessages.appendChild(firstElem)
        const LastElem = createFinishedTicketAcknowledge()
        let lastType = ""
        let lastMessage
        messages.forEach(element => {
            let message = element.text
            let userType = element.userType
            if (userType !== "solved") {
                let div = createMessageDiv(userType, message)
                ticketMessages.appendChild(div)
                lastMessage = element
            }
            lastType = userType
        });
        if (lastType === "") return
        if (lastType === "solved") {
            ticketMessages.appendChild(LastElem)
            document.getElementById("ticket-input").classList.add("disabled")
        } else if (lastMessage.userType === "client" && lastMessage.read === 1) {
            addMessageCheck()
        }
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
        document.getElementById("ticket-messages").appendChild(div1)
        const ticketMessages = document.getElementById("ticket-messages")
        ticketMessages.scrollTo(0, ticketMessages.scrollHeight)
    }

    function deleteMessageCheck() {
        try {
            const check = document.getElementById("check-message-send")
            check.parentNode.removeChild(check)
        } catch (e) {

        }
    }


    function hideMessenger(body, header) {
        setShowMessenger(false)
        body.style.height = "0px"
        body.style.width = "0px"
        document.querySelector("#ticket-messenger hr").style.opacity = "0%"
        document.querySelector("#ticket-messenger i").style.fontSize = "45px"
        header.children[1].style.width = "0px"
        header.children[1].style.height = "0px"
    }

    function showMessenger(body, header) {
        setShowMessenger(true)
        body.style.height = "350px"
        body.style.width = "400px"
        document.querySelector("#ticket-messenger hr").style.opacity = "100%"
        document.querySelector("#ticket-messenger i").style.fontSize = "25px"
        setTimeout(() => {
            header.children[1].style.width = "auto"
            header.children[1].style.height = "auto"
        }, 200)
        let timer = setInterval(() => {
            const ticketMessages = body.querySelector("#ticket-messages")
            ticketMessages.scrollTo(0, ticketMessages.scrollHeight)
        }, 10)
        setTimeout(() => {
            clearInterval(timer)
        }, 400)
        readMessages()
    }

    function messenger() {
        const body = document.getElementById("ticket-body")
        const header = document.getElementById("ticket-header")
        if (messengerShow) {
            hideMessenger(body, header)
        } else {
            showMessenger(body, header)
        }
    }

    function createMessageDiv(userType, message) {
        let newDiv = document.createElement("div")
        newDiv.classList.add("rounded", "px-2", "py-1", "w-75", "shadow-sm", "mt-2")
        newDiv.style.backgroundColor = "whitesmoke"
        let typeDiv = document.createElement("div")
        typeDiv.style.fontWeight = "bold"
        if (userType === "client") {
            typeDiv.innerHTML = "Me"
        } else if (userType === "admin" || userType === "solved") {
            typeDiv.innerHTML = "Admin"
            newDiv.classList.add("align-self-end")
        }
        typeDiv.style.fontSize = "14px"
        let textDiv = document.createElement("div")
        textDiv.innerHTML = message
        textDiv.style.fontSize = "14px"
        newDiv.appendChild(typeDiv)
        newDiv.appendChild(textDiv)
        return newDiv
    }

    function createFirstDivElemFromMessages() {
        let div = document.createElement("div")
        div.style.textAlign = "center"
        div.style.fontSize = "12px"
        div.innerHTML = "Buna ziua!<br/> Sunteti o prioritate pentru noi, asa ca un operator va va prelua in cel mai scurt timp.<br/>Va multumim pentru intelegere!"
        return div
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function createFinishedTicketAcknowledge() {
        let div = document.createElement("div")
        div.classList.add("my-4", "align-self-center")
        div.style.textAlign = "center"
        let div1 = document.createElement("div")
        div1.innerHTML = "Ticket solutionat!"
        let button = document.createElement("button")
        button.classList.add("btn", "btn-primary")
        button.innerHTML = "Close"
        button.addEventListener("click", ticketSolvedButtonAction)
        div.appendChild(div1)
        div.appendChild(button)
        return div
    }

    async function ticketSolvedButtonAction() {
        document.getElementById("ticket-input").classList.remove("disabled")
        await requestHandler(postRequest, {
            link: LINK_CLOSE_TICKET,
            payload: localStorage.getItem("username")
        })
        removeAllChildNodes(document.getElementById("ticket-messages"))
        uploadConversation()
        document.getElementById("ticket-input").classList.remove("disabled")
    }

    async function sendMessageAction() {
        deleteMessageCheck()
        const textarea = document.querySelector("#ticket-input textarea")
        const text = textarea.value
        if (text === "") return
        await requestHandler(postRequest, {
            link: LINK_SEND_MESSAGE_TO_ADMIN,
            payload: {
                username: localStorage.getItem("username"),
                message: text
            }
        })
        textarea.value = ""
        let div = createMessageDiv("client", text)
        const ticketMessages = document.getElementById("ticket-messages")
        ticketMessages.appendChild(div)
        ticketMessages.scrollTo(0, ticketMessages.scrollHeight)
    }

    async function textAreaOnKeyDown(key) {
        if (key.keyCode === 13 && key.shiftKey) {
            //new line - it is done automatically
        }
        else if (key.code === "Enter") {
            sendMessageAction()
        }
        const chatMesages = key.currentTarget.parentNode.parentNode.children[0]
        if (chatMesages.children.length < 2) {
            return
        }
        const value = key.currentTarget.value
        if (value.length > 0) {
            requestHandler(postRequest, {
                link: LINK_SET_TYPING,
                payload: {
                    client_username: localStorage.getItem("username"),
                    action: "yes",
                    userType: "client"
                }
            })
        } else {
            requestHandler(postRequest, {
                link: LINK_SET_TYPING,
                payload: {
                    client_username: localStorage.getItem("username"),
                    action: "no",
                    userType: "client"
                }
            })
        }
    }

    function showTypingDiv() {
        document.getElementById("typing-div").style.display = "block"
    }

    function hideTypingDiv() {
        document.getElementById("typing-div").style.display = "none"
    }

    return (
        <div id="ticket-messenger" >
            <div id="ticket-header" onClick={messenger}>
                <i className="fa-solid fa-message"></i>
                <span id="room-name">Support</span>
            </div>
            <hr style={{ margin: "0" }} />
            <div id="ticket-body" className=' d-flex flex-column'>
                <div id="ticket-messages" className='d-flex flex-column'>

                </div>

                <div id="ticket-input" className='d-flex mt-1' style={{ position: "relative" }}>
                    <div style={{ display: "none", position: "absolute", width: "100px", height: "30px", zIndex: "30", left: "0", top: "0", transform: "translate(50px,-100%)" }} className="bg-whitesmoke border hide" id="typing-div">
                        <div className='ms-2 pt-1'>
                            is typing <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                    <textarea type="text" className='form-control rounded w-75 p-1' placeholder='Write...' style={{ display: 'inline', marginLeft: "15px", maxHeight: "2rem", height: "1rem" }} onKeyUp={textAreaOnKeyDown} />
                    <i className="fa-solid fa-paper-plane p-2" style={{ marginLeft: "5px", cursor: "pointer", marginTop: "auto", marginBottom: "auto" }} onClick={sendMessageAction}></i>
                </div>
            </div>
        </div>
    )
}

export default TicketMessenger