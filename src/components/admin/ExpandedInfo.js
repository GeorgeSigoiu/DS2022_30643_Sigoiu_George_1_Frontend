import React, { useState } from 'react'
import Alert from '../common/Alert'
import "./expanded_info.css"
import Modal from '../common/Modal'
import { getRequest, LINK_PUT_USER, putRequest, LINK_GET_CREDENTIALS_ID, LINK_PUT_CREDENTIALS } from '../requests'

const ExpandedInfo = ({ user, users, setUsers, tokens, setTokens }) => {

    const [requestStatus, setRequestStatus] = useState("")

    //todo for devices
    async function executeSave() {
        console.log("save user info")
        const name = document.getElementById(`name-input-${user.id}`).value
        const checkInput = document.getElementById(`check-role-input-${user.id}`)
        let role
        if (checkInput.checked === true) {
            role = "admin"
        } else {
            role = "client"
        }
        const payload = {
            "name": name,
            "role": role
        }
        const newUser = await putRequest(LINK_PUT_USER, user.id, payload, tokens[0])
        console.log("new user: ", newUser)
        const newUserList = users.filter((el) => el.id !== user.id)
        const index = users.indexOf(user)
        newUserList.splice(index, 0, newUser)
        setUsers([...newUserList])
        setRequestStatus("success")
    }

    function common(e, color, myFunc, html) {
        let device = e.currentTarget.parentNode
        device.style.backgroundColor = color
        let newSpan = e.currentTarget.cloneNode()
        newSpan.removeAttribute("onclick")
        newSpan.addEventListener("click", myFunc)
        newSpan.innerHTML = html
        device.removeChild(e.currentTarget)
        device.appendChild(newSpan)
    }

    function removeDevice(e) {
        console.log("remove device")
        common(e, "rgb(255, 130, 130)", undoRemoveDevice, "O")
    }

    function undoRemoveDevice(e) {
        console.log("redo")
        common(e, "rgb(101, 214, 255)", removeDevice, "X")
    }

    function makeCorrelation(e) {

    }

    async function credentialsModalAction(e) {
        const newUsername = document.getElementById(`change-username-${user.id}`).value
        document.getElementById(`change-username-${user.id}`).value = ""
        const newPassword = document.getElementById(`change-password-${user.id}`).value
        document.getElementById(`change-password-${user.id}`).value = ""

        try {
            const credentialsId = await getRequest(LINK_GET_CREDENTIALS_ID + user.id, tokens[0])
            console.log("credentials id: ", credentialsId)
            const credentials = {
                id: credentialsId,
                username: newUsername,
                password: newPassword
            }
            console.log("payload for credentials update: ", credentials)
            const newCredentials = await putRequest(LINK_PUT_CREDENTIALS, credentialsId, credentials, tokens[0])
            setRequestStatus("success")
        } catch (exception) {
            console.log(exception)
            setRequestStatus("danger")
        }
    }

    return (
        <div className='expanded-info hide-info collapse' id={`expanded-info-${user.id}`} data-bs-parent="#accordion-users" >
            <div className='expanded-info-content'>
                <div>
                    <div className='info-input credentials-info'>
                        Credentials
                        <div className='d-inline-block btn btn-outline-info' data-bs-toggle="modal" data-bs-target={`#modalCredentials-${user.id}`}>
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </div>

                    </div>
                    <div className='info-input name-input'>
                        <label htmlFor="name" >Name</label>
                        <input id={`name-input-${user.id}`} type="text" name="name" defaultValue={user.name} style={{ marginLeft: "1rem", paddingLeft: "10px" }} />
                    </div>
                    <div className='info-input role-input'>
                        <label >Role</label>
                        <div style={{ marginLeft: "1rem" }} className="d-inline-block">
                            <div className='client-text d-inline-block'>
                                client
                            </div>
                            <div className="form-check form-switch d-inline-block"
                                style={{ margin: "0px", padding: "0px", position: "relative" }}>
                                {
                                    user.role === "client" && (<input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`check-role-input-${user.id}`} />)
                                }
                                {
                                    user.role === "admin" && (<input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultChecked
                                        id={`check-role-input-${user.id}`} />)
                                }
                            </div>
                            <div className='administrator-text d-inline-block' >
                                admin
                            </div>
                        </div>
                    </div>
                    <div className='info-input devices-input'>
                        Devices:
                        <input list="all-devices-list" type="text" style={{ marginLeft: "10px", paddingLeft: "10px" }} ></input>
                        <div className='btn btn-success link-btn d-inline-block' onClick={e => makeCorrelation(e)}>
                            <i className="fa-sharp fa-solid fa-link"></i>
                        </div>
                        <datalist id="all-devices-list">
                            <option>Volvo</option>
                            <option>Audi</option>
                            <option>Asteron</option>
                            <option>Volskwagen</option>
                            <option>Mercedes-Benz</option>
                        </datalist>
                        <div className='devices-list' style={{ marginBottom: "1rem", marginTop: "0.5rem" }}>
                            {
                                user.devices.map((el, index) => (
                                    <div className='device-element'
                                        key={index}
                                        style={{ backgroundColor: "rgb(101, 214, 255)", display: "inline-block", padding: "0.2rem 1rem", borderRadius: "20px", marginRight: "10px", marginBottom: "0.5rem", transition: "all 0.4s" }}>
                                        {el.address}
                                        <span style={{ marginLeft: "10px", cursor: "pointer" }} onClick={(e) => removeDevice(e)}>X</span>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "auto", marginBottom: "auto", marginRight: "1rem" }}>
                    <div type="button" className="btn btn-primary" onClick={executeSave}>Save</div>
                </div>
            </div>
            {
                requestStatus !== "" &&
                (
                    < Alert type={requestStatus}
                        message={requestStatus === "success" ? "User saved successfully" : "Error saving the user"}
                        setRequestStatus={setRequestStatus} />
                )
            }
            <Modal modalId={`modalCredentials-${user.id}`} btnMessage={"Save"} title={"Change user credentials"} content={
                (
                    <div>
                        <div>
                            <div style={{ marginTop: "10px" }}>
                                Old username: <span>{user.credentials.username}</span>
                            </div>
                            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                                Old password: <span>{user.credentials.password}</span>
                            </div>
                        </div>
                        <div style={{ height: "1px", backgroundColor: "black" }}></div>
                        <div>
                            <div style={{ marginTop: "10px" }}>
                                New username: <input type="text" id={`change-username-${user.id}`} defaultValue={user.credentials.username} />
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                New password: <input type="password" id={`change-password-${user.id}`} />
                            </div>
                        </div>
                    </div>
                )
            } execute={credentialsModalAction} />
        </div >
    )
}

export default ExpandedInfo