import React, { useState } from 'react'
import { requestHandler } from '../handlers'
import { LINK_PUT_CREDENTIALS, putRequest } from '../requests'
import Alert from './Alert'
import '../../css/settings.css'

const Settings = ({ loggedUser, setLoggedUser }) => {

    const [requestStatus, setRequestStatus] = useState("")

    function resetIcons() {
        const icon1 = document.getElementById("icon-old-password")
        const icon2 = document.getElementById("icon-new-password")
        const icon3 = document.getElementById("icon-repeat-password")
        const icons = [icon1, icon2, icon3]
        icons.forEach(element => {
            element.style.opacity = "0"
            element.style.pointerEvents = "none"
        });
        const pass1 = document.getElementById("settings-old-password")
        const pass2 = document.getElementById("settings-new-password")
        const pass3 = document.getElementById("settings-repeat-password")
        const pass = [pass1, pass2, pass3]
        pass.forEach(element => {
            element.style.borderColor = "rgb(0,0,0)"
        })
    }

    function checkSamePasswords(pass1, pass2) {
        if (pass1 === pass2) {
            return true
        }
        //todo some warning message
        const repeatPasswordItem = document.getElementById("settings-repeat-password")
        repeatPasswordItem.style.borderColor = "rgb(190, 205, 50)"
        const iconItem = document.getElementById("icon-repeat-password")
        iconItem.style.pointerEvents = "all"
        iconItem.style.opacity = "100%"
        return false
    }

    async function checkOldPassword(oldPass) {
        const pass = loggedUser.credentials.password
        if (oldPass === pass) {
            return true
        }
        //todo some messages
        const repeatPasswordItem = document.getElementById("settings-old-password")
        repeatPasswordItem.style.borderColor = "rgb(190, 205, 50)"
        const iconItem = document.getElementById("icon-old-password")
        iconItem.style.pointerEvents = "all"
        iconItem.style.opacity = "100%"
        return false
    }

    function checkPasswordNotEmpty(pass) {
        if (pass !== "") {
            return true
        }
        const passItem = document.getElementById("settings-new-password")
        passItem.style.borderColor = "rgb(190, 205, 50)"
        const iconItem = document.getElementById("icon-new-password")
        iconItem.style.pointerEvents = "all"
        iconItem.style.opacity = "100%"
        return false
    }

    async function changePassword() {
        const oldPassword = document.getElementById("settings-old-password").value
        const newPassword = document.getElementById("settings-new-password").value
        const repeatPassword = document.getElementById("settings-repeat-password").value
        resetIcons()
        const areTheSame = checkSamePasswords(newPassword, repeatPassword)
        if (!areTheSame) {
            return
        }
        const isNotEmpty = checkPasswordNotEmpty(newPassword)
        if (!isNotEmpty) {
            return
        }

        const isValid = await checkOldPassword(oldPassword)
        if (!isValid) {
            return
        }

        const payload = {
            id: loggedUser.credentials.id,
            password: newPassword,
            username: loggedUser.credentials.username
        }
        try {
            const args = {
                link: LINK_PUT_CREDENTIALS + loggedUser.credentials.id,
                payload: payload
            }
            await requestHandler(putRequest, args)
            setRequestStatus("success")
            const newUser = {
                id: loggedUser.id,
                devices: loggedUser.devices,
                credentials: {
                    id: loggedUser.credentials.id,
                    username: loggedUser.credentials.username,
                    password: newPassword
                },
                name: loggedUser.name,
                role: loggedUser.role
            }
            setLoggedUser(newUser)
        } catch (exception) {
            setRequestStatus("danger")
            console.log(exception)
        }
        document.getElementById("settings-old-password").value = ""
        document.getElementById("settings-new-password").value = ""
        document.getElementById("settings-repeat-password").value = ""

    }

    return (
        <div id="settings">
            <div className='container'>
                <div className='content-title'>
                    <h3>Change password</h3>
                </div>
                <div className='content'>
                    <div className='input-field'>
                        <label htmlFor='old-password' >Old password: </label>
                        <div>
                            <input type="password" name="old-password" id="settings-old-password" />
                            <i className="fa-solid fa-circle-exclamation" data-bs-toggle="tooltip" title="Password is incorrect!" id="icon-old-password"></i>
                        </div>

                    </div>
                    <div className='input-field'>
                        <label htmlFor='new-password' >New password: </label>
                        <div>
                            <input type="password" name="new-password" id="settings-new-password" />
                            <i className="fa-solid fa-circle-exclamation" data-bs-toggle="tooltip" title="Password is weak!" id="icon-new-password"></i>
                        </div>

                    </div>
                    <div className='input-field'>
                        <label htmlFor='repeat-password' >Repeat new password: </label>
                        <div>
                            <input type="password" name="repeat-password" id="settings-repeat-password" />
                            <i className="fa-solid fa-circle-exclamation" data-bs-toggle="tooltip" title="Passwords are not the same!" id="icon-repeat-password"></i>
                        </div>
                    </div>
                </div>
                <div className='btn btn-primary btn-password' onClick={changePassword}>
                    change password
                </div>
            </div>
            {
                requestStatus !== "" &&
                (
                    < Alert type={requestStatus}
                        message={requestStatus === "success" ? "Password saved successfully" : "Error changing the password"}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </div >
    )
}

export default Settings