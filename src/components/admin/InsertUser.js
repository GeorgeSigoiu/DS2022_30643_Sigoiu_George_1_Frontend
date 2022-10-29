import React, { useState } from 'react'
import Alert from '../common/Alert'
import Modal from '../common/Modal'
import { requestHandler } from '../handlers'
import { insertUser } from '../requests'

const InsertUser = ({ tokens, setTokens, users, setUsers }) => {

    const [requestStatus, setRequestStatus] = useState("")

    async function insertUserAction() {
        console.log("insert user")
        const username = document.getElementById("creation-username").value
        document.getElementById("creation-username").value = ""
        const password = document.getElementById("creation-password").value
        document.getElementById("creation-password").value = ""
        const name = document.getElementById("creation-name").value
        document.getElementById("creation-name").value = ""
        const select = document.getElementById("creation-role")
        const role = select.options[select.selectedIndex].innerHTML
        const userToInsert = {
            name: name,
            password: password,
            username: username,
            role: role
        }
        try {
            const newUser = await requestHandler(insertUser, {
                link: "",
                payload: userToInsert
            }, tokens, setTokens)
            setUsers([...users, newUser])
            console.log(username, password, name, role)
            setRequestStatus("success")
        } catch (exception) {
            console.log(exception)
            setRequestStatus("danger")
        }
    }

    return (
        <div id="insert-user" style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <div type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" >
                <i className="fa-solid fa-plus" style={{ marginRight: "10px" }}></i>
                Add user
            </div>
            <Modal modalId={"myModal"} btnMessage={"Add"} title={"Add new user"} content={
                (
                    <div>
                        <div className='space-for-all-subdivs'>
                            <div>
                                Username: <input type="text" id="creation-username" />
                            </div>
                            <div>
                                Password: <input type="password" id="creation-password" />
                            </div>
                            <div>
                                Name: <input type="text" id="creation-name" />
                            </div>
                            <div>
                                Role:
                                <select style={{ marginLeft: "10px" }} id="creation-role">
                                    <option>client</option>
                                    <option>admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )
            } execute={insertUserAction} />
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