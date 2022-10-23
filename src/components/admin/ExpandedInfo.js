import React, { useState } from 'react'
import Alert from '../common/Alert'
import "./expanded_info.css"

const ExpandedInfo = ({ user }) => {

    const [requestStatus, setRequestStatus] = useState("")

    function executeSave() {
        console.log("save user info")
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

    return (
        <div className='expanded-info hide-info collapse' id={`expanded-info-${user.id}`} data-bs-parent="#accordion" >
            <div className='expanded-info-content'>
                <div>
                    <div className='info-input name-input'>
                        <label htmlFor="name" >Name</label>
                        <input type="text" name="name" defaultValue={user.name} style={{ marginLeft: "1rem", paddingLeft: "10px" }} />
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
                                        type="checkbox" />)
                                }
                                {
                                    user.role === "administrator" && (<input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultChecked />)
                                }
                            </div>
                            <div className='administrator-text d-inline-block' >
                                administrator
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
        </div >
    )
}

export default ExpandedInfo