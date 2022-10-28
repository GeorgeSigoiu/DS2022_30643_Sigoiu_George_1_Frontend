import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import './device_element.css'
import Alert from '../common/Alert'
import { deleteRequest, LINK_DELETE_DEVICE, LINK_DELETE_USER, LINK_PUT_DEVICE, putRequest } from '../requests'

const DeviceElement = ({ device, tokens, setTokens, devices, setDevices }) => {

    const [requestStatus, setRequestStatus] = useState("")

    async function executeDelete() {
        console.log("delete device")
        const deviceId = device.id
        try {
            const responseStatus = await deleteRequest(LINK_DELETE_DEVICE + deviceId, tokens[0], null)
            console.log(responseStatus)
            if (responseStatus >= 200 && responseStatus < 300) {
                setRequestStatus("success")
                const newDevicesList = devices.filter((el) => el.id !== deviceId)
                setDevices([...newDevicesList])
            } else {
                setRequestStatus("danger")
            }
        } catch (exception) {
            alert(exception)
            setRequestStatus("danger")
        }
    }

    async function executeSave() {
        console.log("save device")
        const address = document.getElementById("edit-device-address").value
        const description = document.getElementById("edit-device-description").value
        const consumption = document.getElementById("edit-device-consumption").value
        const payload = {
            address: address,
            description: description,
            maxHourlyEnergyConsumption: consumption
        }
        try {
            const newDevice = await putRequest(LINK_PUT_DEVICE + device.id, tokens[0], payload)
            const index = devices.indexOf(device)
            const newDevicesList = devices.filter((el) => el.id !== device.id)
            newDevicesList.splice(index, 0, newDevice)
            setDevices([...newDevicesList])
            setRequestStatus("success")
        } catch (exception) {
            setRequestStatus("danger")
            alert(exception)
        }
    }

    return (
        <div className="device-element">
            <div className="card" >
                <div className="card-content">
                    <div className='info-field'>
                        <div style={{ fontSize: "25px" }}>
                            <b>Address:</b> {device.address}
                        </div>
                        <div>
                            <b>Description:</b>
                        </div>
                        <div>
                            {device.description}
                        </div>
                        <div>
                            <b>Max hourly consumption:</b> {device.maxHourlyEnergyConsumption}
                        </div>
                        <div>
                            <b>Consumption history</b>
                            <span style={{ marginLeft: "10px", padding: "0rem 0.2rem" }} className="btn btn-primary" >
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </span>
                        </div>
                    </div>
                    <div className='operation-field'>
                        <div className='icon btn btn-primary' data-bs-toggle="modal" data-bs-target={`#myModal-edit-${device.id}`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div className='icon btn btn-danger' data-bs-toggle="modal" data-bs-target={`#myModal-delete-${device.id}`}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>

            <Modal type="alert"
                title={"Are you sure you want to delete?"}
                content={`Device from address: ${device.address}?`}
                modalId={`myModal-delete-${device.id}`}
                btnMessage={"Yes, delete"}
                execute={executeDelete} />
            <Modal type="alert"
                title={"Are you sure you want to delete?"}
                content={
                    <div>
                        <div className='space-for-all-subdivs'>
                            <div>
                                Address: <input type="text" id="edit-device-address" style={{ width: "300px" }} defaultValue={device.address} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <p>
                                    Description
                                </p>
                                <textarea id="edit-device-description" defaultValue={device.description} />
                            </div>
                            <div>
                                Max hourly consumption: <input type="number" id="edit-device-consumption" style={{ width: "100px" }} defaultValue={device.maxHourlyEnergyConsumption} />
                            </div>
                        </div>
                    </div>
                }
                modalId={`myModal-edit-${device.id}`}
                btnMessage={"Save"}
                execute={executeSave} />
            {
                requestStatus !== "" &&
                (
                    < Alert type={requestStatus}
                        message={requestStatus === "success" ? "User deleted successfully" : "Error deleting the user"}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </div>

    )
}

export default DeviceElement