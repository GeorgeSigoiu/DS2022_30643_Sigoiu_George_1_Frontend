import React from 'react'
import Modal from '../common/Modal'

const InsertUser = () => {

    return (
        <div id="insert-user" style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                <i className="fa-solid fa-plus" style={{ marginRight: "10px" }}></i>
                Add user
            </button>
            <Modal modalId={"myModal"} btnMessage={"Add"} title={"Add new user"} content={
                (
                    <div>TODO FORM</div>

                )
            } />
        </div>
    )
}

export default InsertUser