import React, { useState } from 'react'
import Alert from '../common/Alert'
import Modal from '../common/Modal'
import { requestHandler } from '../handlers'
import { getRequest, insertUser, LINK_VERIFY_USERNAME_UNIQUE } from '../requests'

const InsertUser = ({ tokens, setTokens, users, setUsers }) => {

    const [requestStatus, setRequestStatus] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    async function checkUsernameIsNew(username) {
        try {
            const response = await requestHandler(getRequest, {
                link: LINK_VERIFY_USERNAME_UNIQUE + username,
                payload: {}
            }, tokens, setTokens)
            return response
        } catch (exception) {
            return "error"
        }
    }

    async function insertUserAction() {
        console.log("insert user")
        const username = document.getElementById("creation-username").value.trim()
        document.getElementById("creation-username").value = ""
        const password = document.getElementById("creation-password").value
        document.getElementById("creation-password").value = ""
        const name = document.getElementById("creation-name").value
        document.getElementById("creation-name").value = ""
        if (name === "" || name.trim() === "") {
            return "don't close"
        }
        if (password === "") {
            return "don't close"
        }
        if (username === "" || username.trim() === "") {
            return "don't close"
        }
        const isNew = await checkUsernameIsNew(username)
        if (isNew === "error") {
            setErrorMessage("Error adding the user!")
            setRequestStatus("danger")
            return
        }
        if (!isNew) {
            setErrorMessage("Username already exists!")
            setRequestStatus("danger")
            return
        }
        const select = document.getElementById("creation-role")
        const role = select.options[select.selectedIndex].innerHTML
        const userToInsert = {
            name: name,
            password: password,
            username: username,
            role: role
        }
        try {
            const newUser = await requestHandler(insertUser, {
                link: "",
                payload: userToInsert
            }, tokens, setTokens)
            setUsers([...users, newUser])
            console.log(username, password, name, role)
            setErrorMessage("User added successfully!")
            setRequestStatus("success")
        } catch (exception) {
            console.log(exception)
            setErrorMessage("Error adding the user!")
            setRequestStatus("danger")
        }
    }

    function onChangeAction(e) {
        const text = e.currentTarget.value
        const textWithoutSpaces = text.replaceAll(" ", "")
        const icon = e.currentTarget.parentNode.children[1]
        if (text === "" || textWithoutSpaces === "") {
            icon.style.opacity = "100%"
            icon.style.pointerEvents = "all"
        } else {
            icon.style.opacity = "0%"
            icon.style.pointerEvents = "none"
        }
    }

    function onChangeDoNotAllowSpace(e) {
        e.currentTarget.value = e.currentTarget.value.trim()
        onChangeAction(e)
    }

    function onBlurAction(e) {
        e.currentTarget.value = e.currentTarget.value.trim()
    }

    return (
        <div id="insert-user" style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <div type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" >
                <i className="fa-solid fa-plus" id="btn-inser-user" style={{ marginRight: "10px" }}></i>
                Add user
            </div>
            <Modal modalId={"myModal"} btnMessage={"Add"} title={"Add new user"} content={
                (
                    <div>
                        <div className='space-for-all-subdivs'>
                            <div>
                                Username: <input className='px-1' type="text" id="creation-username" onChange={(e) => onChangeDoNotAllowSpace(e)} onBlur={(e) => onBlurAction(e)} />
                                <i className="fa-solid fa-circle-exclamation fa-xl" data-bs-toggle="tooltip" title="Username can not be empty!" id="icon-new-password" style={{ color: "rgb(190, 205, 50)", marginLeft: "10px", opacity: "0%", pointerEvents: "none" }}></i>
                            </div>
                            <div>
                                Password: <input className='px-1' type="password" id="creation-password" onChange={(e) => onChangeAction(e)} />
                                <i className="fa-solid fa-circle-exclamation fa-xl" data-bs-toggle="tooltip" title="Password can not be empty!" id="icon-new-password" style={{ color: "rgb(190, 205, 50)", marginLeft: "10px", opacity: "0%", pointerEvents: "none" }}></i>
                            </div>
                            <div>
                                Name: <input className='px-1' type="text" id="creation-name" onChange={(e) => onChangeAction(e)} onBlur={(e) => onBlurAction(e)} />
                                <i className="fa-solid fa-circle-exclamation fa-xl" data-bs-toggle="tooltip" title="Name can not be empty!" id="icon-new-password" style={{ color: "rgb(190, 205, 50)", marginLeft: "10px", opacity: "0%", pointerEvents: "none" }}></i>
                            </div>
                            <div>
                                Role:
                                <select style={{ marginLeft: "10px" }} id="creation-role">
                                    <option>client</option>
                                    <option>admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )
            } execute={insertUserAction} keepOpen={true} />
            {
                requestStatus !== "" && errorMessage !== "" &&
                (
                    < Alert type={requestStatus}
                        message={errorMessage}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </div>
    )
}

export default InsertUser