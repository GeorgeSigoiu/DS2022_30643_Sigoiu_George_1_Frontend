import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import '../../css/device_element.css'
import Alert from '../common/Alert'
import { deleteRequest, LINK_DELETE_DEVICE, LINK_DELETE_USER, LINK_PUT_DEVICE, putRequest } from '../requests'
import { requestHandler } from '../handlers'
import ChartElement from './charts/ChartElement'

const DeviceElement = ({ device, devices, setDevices, role }) => {

    const [requestStatus, setRequestStatus] = useState("")
    const [executeMessage, setExecuteMessage] = useState("")

    async function executeDelete() {
        const deviceId = device.id
        try {
            const args = {
                link: LINK_DELETE_DEVICE + deviceId,
                payload: {}
            }
            const responseStatus = await requestHandler(deleteRequest, args)
            if (responseStatus >= 200 && responseStatus < 300) {
                setExecuteMessage("Device successfuly deleted!")
                setRequestStatus("success")
                const newDevicesList = devices.filter((el) => el.id !== deviceId)
                setDevices([...newDevicesList])
            } else {
                setExecuteMessage("Error deleting the device!")
                setRequestStatus("danger")
            }
        } catch (exception) {
            console.log(exception)
            setExecuteMessage("Error deleting the device!")
            setRequestStatus("danger")
        }
    }

    async function executeSave() {
        const address = document.getElementById(`edit-device-address-${device.id}`).value
        const description = document.getElementById(`edit-device-description-${device.id}`).value
        const consumption = document.getElementById(`edit-device-consumption-${device.id}`).value
        if (address === "" || address.trim() === "") {
            setExecuteMessage("Address can not be empty! Device did not change!")
            setRequestStatus("danger")
            return
        }
        const payload = {
            address: address,
            description: description,
            maxHourlyEnergyConsumption: consumption
        }
        try {
            const args = {
                link: LINK_PUT_DEVICE + device.id,
                payload: payload
            }
            const response = await requestHandler(putRequest, args)
            const newDevice = response.data
            const index = devices.indexOf(device)
            const newDevicesList = devices.filter((el) => el.id !== device.id)
            newDevicesList.splice(index, 0, newDevice)
            setDevices([...newDevicesList])
            setExecuteMessage("Device was saved")
            setRequestStatus("success")
        } catch (exception) {
            setExecuteMessage("Error editing the device")
            setRequestStatus("danger")
            console.log(exception)
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
                            <span style={{ marginLeft: "10px", padding: "0rem 0.2rem" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#chart-show-${device.id}`} >
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </span>
                        </div>
                    </div>
                    {
                        role === "admin" &&
                        (<div className='operation-field'>
                            <div className='icon btn btn-primary' data-bs-toggle="modal" data-bs-target={`#myModal-edit-${device.id}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div className='icon btn btn-danger' data-bs-toggle="modal" data-bs-target={`#myModal-delete-${device.id}`}>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                        </div>)
                    }
                    <Modal type="alert"
                        title={`Chart: energy consumption`}
                        content={
                            <ChartElement device={device} />
                        }
                        modalId={`chart-show-${device.id}`}
                        btnMessage={"Ok"}
                        execute={() => { }} />
                </div>
            </div>
            {
                role === "admin" && (
                    <>
                        <Modal type="alert"
                            title={"Are you sure you want to delete?"}
                            content={`Device from address: ${device.address}?`}
                            modalId={`myModal-delete-${device.id}`}
                            btnMessage={"Yes, delete"}
                            execute={executeDelete} />
                        <Modal type="alert"
                            title={"Edit information"}
                            content={<div>
                                <div className='space-for-all-subdivs'>
                                    <div>
                                        Address: <input className='px-1' type="text" id={`edit-device-address-${device.id}`} style={{ width: "300px" }} defaultValue={device.address} />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <p>
                                            Description
                                        </p>
                                        <textarea className='px-1' id={`edit-device-description-${device.id}`} defaultValue={device.description} />
                                    </div>
                                    <div>
                                        Max hourly consumption: <input className='px-1' type="number" id={`edit-device-consumption-${device.id}`} style={{ width: "100px" }} defaultValue={device.maxHourlyEnergyConsumption} />
                                    </div>
                                </div>
                            </div>}
                            modalId={`myModal-edit-${device.id}`}
                            btnMessage={"Save"}
                            execute={executeSave}
                        />
                    </>
                )
            }

            {
                requestStatus !== "" &&
                (
                    < Alert type={requestStatus}
                        message={executeMessage}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </div>

    )
}

export default DeviceElement