import React, { useEffect, useState } from 'react'

const Alert = ({ type, message, setRequestStatus }) => {

    const [shown, setShown] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            const allAlerts = document.querySelectorAll(".alert-container .alert .btn-close")
            allAlerts.forEach((el) => {
                el.click()
                setRequestStatus("")
            })
        }, 3000)
    }, [shown])

    const alertType = type === "success" ? "Success" : "Warning"


    return (
        <div style={{ position: 'fixed', top: "1rem", left: "50%", transform: "translateX(-50%)", zIndex: "100" }} className="alert-container">
            <div className={`alert alert-${type} alert-dismissible fade show`}>
                <div type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setRequestStatus("")}></div>
                <strong>{alertType}!</strong> {message}.
            </div>
        </div>
    )
}

export default Alert