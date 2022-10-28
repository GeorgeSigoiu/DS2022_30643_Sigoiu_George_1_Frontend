import React, { useState } from 'react'
import Alert from '../common/Alert'
import Modal from '../common/Modal'
import { LINK_ADD_DEVICE, postRequest } from '../requests'

const InsertDevice = ({ tokens, setTokens, devices, setDevices }) => {

    const [requestStatus, setRequestStatus] = useState("")

    async function insertDeviceAction() {
        console.log("insert device")
        const address = document.getElementById("insert-device-address").value
        document.getElementById("insert-device-address").value = ""
        const description = document.getElementById("insert-device-description").value
        document.getElementById("insert-device-description").text = ""
        const consumption = document.getElementById("insert-device-consumption").value
        document.getElementById("insert-device-consumption").value = ""
        const payload = {
            address: address,
            description: description,
            maxHourlyEnergyConsumption: consumption
        }
        try {
            console.log(payload)
            const newDevice = await postRequest(LINK_ADD_DEVICE, tokens[0], payload)
            setDevices([...devices, newDevice])
            setRequestStatus("success")
        } catch (exception) {
            alert(exception)
            setRequestStatus("danger")
        }
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
                                Address: <input type="text" id="insert-device-address" style={{ width: "300px" }} />
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
                        message={requestStatus === "success" ? "Device added successfully" : "Error adding the device"}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </div>
    )
}

export default InsertDevice