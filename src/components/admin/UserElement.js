import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import ExpandedInfo from './ExpandedInfo'
import '../../css/user_element.css'
import Alert from '../common/Alert'
import { deleteRequest, LINK_DELETE_USER } from '../requests'
import { requestHandler } from '../handlers'

const UserElement = ({ user, users, setUsers, devices, setDevices }) => {

    const [requestStatus, setRequestStatus] = useState("")

    async function executeDelete() {
        const userId = user.id
        try {
            const responseStatus = await requestHandler(deleteRequest, {
                link: LINK_DELETE_USER + userId,
                payload: {}
            })
            if (responseStatus >= 200 && responseStatus < 300) {
                setRequestStatus("success")
                const newListUsers = users.filter((el) => el.id !== userId)
                setUsers([...newListUsers])
            } else {
                setRequestStatus("danger")
            }
        } catch (exception) {
            console.log(exception)
            setRequestStatus("danger")
        }

    }

    return (
        <div className="user-element">
            <div className="card" >
                <div className="card-content">
                    <div className='name-field'>
                        <b>{user.name}</b>
                        <span style={{ marginLeft: "1rem" }}>{user.role}</span>
                    </div>
                    <div className='operation-field'>
                        <div id={`eye-${user.id}`}
                            className='icon btn btn-info'
                            data-bs-toggle="collapse"
                            href={`#expanded-info-${user.id}`}>
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <div className='icon btn btn-danger' data-bs-toggle="modal" data-bs-target={`#myModal-${user.id}`}>
                            <i className="fa-solid fa-trash"></i>
                        </div>

                    </div>
                </div>
                <ExpandedInfo user={user} users={users} setUsers={setUsers} devices={devices} setDevices={setDevices} />
            </div>

            <Modal type="alert"
                title={"Are you sure you want to delete?"}
                content={`${user.name}`}
                modalId={`myModal-${user.id}`}
                btnMessage={"Yes, delete"}
                execute={executeDelete} />
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

export default UserElement