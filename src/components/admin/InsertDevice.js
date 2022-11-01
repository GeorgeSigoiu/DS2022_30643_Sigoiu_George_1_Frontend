import React, { useState } from 'react'
import Alert from '../common/Alert'
import Modal from '../common/Modal'
import { requestHandler } from '../handlers'
import { LINK_ADD_DEVICE, postRequest } from '../requests'

const InsertDevice = ({ tokens, setTokens, devices, setDevices }) => {

    const [requestStatus, setRequestStatus] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    async function checkUniqueAddress(address) {
        return false
    }

    async function insertDeviceAction() {
        console.log("insert device")
        const address = document.getElementById("insert-device-address").value
        document.getElementById("insert-device-address").value = ""
        const description = document.getElementById("insert-device-description").value
        document.getElementById("insert-device-description").text = ""
        const consumption = document.getElementById("insert-device-consumption").value
        document.getElementById("insert-device-consumption").value = ""
        if (address === "" || address.trim() === "") {
            return "don't close"
        }
        const isNew = await checkUniqueAddress(address)
        if (!isNew) {
            setErrorMessage("Device with this address already exists!")
            setRequestStatus("danger")
            return
        }
        const payload = {
            address: address,
            description: description,
            maxHourlyEnergyConsumption: consumption
        }
        try {
            console.log(payload)
            const newDevice = await requestHandler(postRequest, {
                link: LINK_ADD_DEVICE,
                payload: payload
            }, tokens, setTokens)
            setDevices([...devices, newDevice])
            setRequestStatus("success")
            setErrorMessage("Device added successfully")
        } catch (exception) {
            console.log(exception)
            setRequestStatus("danger")
            setErrorMessage("Error adding the device!")
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

    function onBlurAction(e) {
        e.currentTarget.value = e.currentTarget.value.trim()
    }

    return (
        <div id="insert-device" style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <div type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal-devices" >
                <i className="fa-solid fa-plus" style={{ marginRight: "10px" }}></i>
                Add device
            </div>
            <Modal modalId={"myModal-devices"} btnMessage={"Add"} title={"Add new device"} content={
                (
                    <div>
                        <div className='space-for-all-subdivs'>
                            <div>
                                Address: <input type="text" id="insert-device-address" style={{ width: "300px" }} onBlur={(e) => onBlurAction(e)} onChange={(e) => onChangeAction(e)} />
                                <i className="fa-solid fa-circle-exclamation fa-xl" data-bs-toggle="tooltip" title="Username can not be empty!" id="icon-new-password" style={{ color: "rgb(190, 205, 50)", marginLeft: "10px", opacity: "0%", pointerEvents: "none" }}></i>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <p>
                                    Description
                                </p>
                                <textarea id="insert-device-description" />
                            </div>
                            <div>
                                Max hourly consumption: <input type="number" id="insert-device-consumption" style={{ width: "100px" }} />
                            </div>
                        </div>
                    </div>
                )
            } execute={insertDeviceAction} />
            {
                requestStatus !== "" &&
                (
                    < Alert type={requestStatus}
                        message={errorMessage}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </div>
    )
}

export default InsertDevice