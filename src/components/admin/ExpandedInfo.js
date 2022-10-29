import React, { useEffect, useState } from 'react'
import Alert from '../common/Alert'
import "./expanded_info.css"
import Modal from '../common/Modal'
import { getRequest, LINK_PUT_USER, putRequest, LINK_GET_CREDENTIALS_ID, LINK_PUT_CREDENTIALS, LINK_ADD_DEVICE_TO_USER, LINK_GET_USER, LINK_UPDATE_DEVICES_USER, LINK_GET_DEVICES_WITHOUT_OWNER } from '../requests'
import { requestHandler } from '../handlers'

const ExpandedInfo = ({ user, users, setUsers, tokens, setTokens, devices, setDevices }) => {

    const [requestStatus, setRequestStatus] = useState("")

    function getRemovedDevicesIds() {
        try {
            const components = document.querySelectorAll(`#expanded-info-${user.id} .devices-input .devices-list .device-element`)
            const idList = []
            for (let i = 0; i < components.length; i++) {
                const id = components[i].id.replace("device-element-", "")
                const sign = components[i].querySelector("span").innerHTML
                if (sign === "O") {
                    idList.push(Number(id))
                }
            }
            return idList
        } catch (exception) {
            console.log("Exception getting the addresses: ", exception)
        }
        return []
    }

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
        try {
            let madeOneRequest = false
            if (name !== user.name || role !== user.role) {
                madeOneRequest = true
                console.log("update name and role")
                await requestHandler(putRequest, {
                    link: LINK_PUT_USER + user.id,
                    payload: payload
                }, tokens, setTokens)
            }
            const removedDevicesIds = getRemovedDevicesIds()
            if (removedDevicesIds.length > 0) {
                madeOneRequest = true
                console.log("update linked devices")
                await requestHandler(putRequest, {
                    link: LINK_UPDATE_DEVICES_USER + "0",
                    payload: removedDevicesIds
                }, tokens, setTokens)
            }
            let newUser = user
            if (madeOneRequest) {
                console.log("get the user after save")
                newUser = await requestHandler(getRequest, {
                    link: LINK_GET_USER + user.id,
                    payload: {}
                }, tokens, setTokens)
                const newUserList = users.filter((el) => el.id !== user.id)
                const index = users.indexOf(user)
                newUserList.splice(index, 0, newUser)
                setUsers([...newUserList])
                const data = await requestHandler(getRequest, {
                    link: LINK_GET_DEVICES_WITHOUT_OWNER,
                    payload: {}
                }, tokens, setTokens)
                setDevices([...data])
                setRequestStatus("success")
            }
        } catch (exception) {
            setRequestStatus("danger")
            console.log(exception)
        }

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

    async function makeCorrelation(e) {
        const input = document.getElementById(`input-for-datalist-${user.id}`)
        const inputValue = input.value
        if (inputValue === "") {
            return
        }
        input.value = ""
        console.log(inputValue)
        const theDevice = devices.filter((el) => el.address === inputValue)
        console.log(theDevice[0])
        if (theDevice[0] === null || theDevice[0] === undefined) {
            alert("The value does not correspound to a valid address")
            return
        }
        const newLink = LINK_ADD_DEVICE_TO_USER.replace("DEVICEID", theDevice[0].id).replace("USERID", user.id)
        try {
            const response = await requestHandler(putRequest, {
                link: newLink,
                payload: {}
            }, tokens, setTokens)
            const newUser = response.data
            console.log("new user: ", newUser)
            const newList = users.filter((el) => el.id !== user.id)
            const index = users.indexOf(user)
            newList.splice(index, 0, newUser)
            const newDevicesList = devices.filter((el) => el.id !== theDevice[0].id)
            setDevices([...newDevicesList])
            setUsers([...newList])
            setRequestStatus("success")
        } catch (exception) {
            setRequestStatus("danger")
            console.log(exception)
        }

    }

    async function credentialsModalAction(e) {
        const newUsername = document.getElementById(`change-username-${user.id}`).value
        document.getElementById(`change-username-${user.id}`).value = ""
        const newPassword = document.getElementById(`change-password-${user.id}`).value
        document.getElementById(`change-password-${user.id}`).value = ""

        try {
            const credentialsId = await requestHandler(getRequest, {
                link: LINK_GET_CREDENTIALS_ID + user.id,
                payload: {}
            }, tokens, setTokens)
            console.log("credentials id: ", credentialsId)
            const credentials = {
                id: credentialsId,
                username: newUsername,
                password: newPassword
            }
            console.log("payload for credentials update: ", credentials)
            await requestHandler(putRequest, {
                link: LINK_PUT_CREDENTIALS + credentialsId,
                payload: credentials
            }, tokens, setTokens)
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
                        <input id={`input-for-datalist-${user.id}`} list="all-devices-list" type="text" style={{ marginLeft: "10px", paddingLeft: "10px" }} ></input>
                        <div className='btn btn-success link-btn d-inline-block' onClick={e => makeCorrelation(e)}>
                            <i className="fa-sharp fa-solid fa-link"></i>
                        </div>
                        <datalist id="all-devices-list">
                            {
                                devices.map((el, index) => (
                                    <option key={index}>{el.address}</option>
                                ))
                            }
                        </datalist>
                        <div className='devices-list' style={{ marginBottom: "1rem", marginTop: "0.5rem" }}>
                            {
                                user.devices.map((el, index) => (
                                    <div className='device-element'
                                        id={`device-element-${el.id}`}
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