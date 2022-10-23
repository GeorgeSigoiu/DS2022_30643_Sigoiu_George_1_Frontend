import React, { useState } from 'react'
import Alert from '../common/Alert'
import Modal from '../common/Modal'

const InsertUser = () => {

    const [requestStatus, setRequestStatus] = useState("")

    function insertUser() {
        console.log("insert user")
        setRequestStatus("danger")
    }

    return (
        <div id="insert-user" style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <div type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" >
                <i className="fa-solid fa-plus" style={{ marginRight: "10px" }}></i>
                Add user
            </div>
            <Modal modalId={"myModal"} btnMessage={"Add"} title={"Add new user"} content={
                (
                    <div>TODO FORM</div>
                )
            } execute={insertUser} />
            {
                requestStatus !== "" &&
                (
                    < Alert type={requestStatus}
                        message={requestStatus === "success" ? "User added successfully" : "Error adding the user"}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </div>
    )
}

export default InsertUser