import React, { useEffect, useState } from 'react'
import './user_element.css'

const UserElement = ({ user }) => {

    function change_expanded_info_state(event) {
        const id = event.currentTarget.id.split('-')[1]
        const infoBlockTag = `expanded-info-${id}`
        const infoBlock = document.getElementById(infoBlockTag)
        const contains = infoBlock.classList.contains("hide-info")
        hide_all_info(infoBlockTag)
        if (contains) {
            infoBlock.classList.remove("hide-info")
        } else {
            infoBlock.classList.add("hide-info")
        }
    }

    function hide_all_info(elementId) {
        const lst = document.querySelectorAll(".user-element .card .expanded-info")
        for (let i = 0; i < lst.length; i++) {
            const el = lst[i]
            const id = el.id
            if (id !== elementId) {
                el.classList.add("hide-info")
            }
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
                            className='icon'
                            data-bs-toggle="collapse"
                            href={`#expanded-info-${user.id}`}>
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <div id={`trash-${user.id}`} className='icon' >
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
                <div className='expanded-info hide-info collapse' id={`expanded-info-${user.id}`} data-bs-parent="#accordion" >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <div className='info-input name-input'>
                                <label htmlFor="name" >Name</label>
                                <input type="text" name="name" style={{ marginLeft: "1rem" }} />
                            </div>
                            <div className='info-input role-input'>
                                <label >Role</label>
                                <div style={{ display: "inline-block", marginLeft: "1rem" }}>
                                    <div className='client-text' style={{ display: "inline-block" }}>
                                        client
                                    </div>
                                    <div className="form-check form-switch"
                                        style={{ display: "inline-block", margin: "0px", padding: "0px", position: "relative", }}>
                                        {
                                            user.role === "client" && (<input
                                                className="form-check-input"
                                                type="checkbox"
                                                style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }} />)
                                        }
                                        {
                                            user.role === "administrator" && (<input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultChecked
                                                style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }} />)
                                        }
                                    </div>
                                    <div className='administrator-text' style={{ display: "inline-block" }}>
                                        administrator
                                    </div>
                                </div>
                            </div>
                            <div className='info-input devices-list'>
                                Devices:
                            </div>
                        </div>
                        <div style={{ marginTop: "auto", marginBottom: "auto", marginRight: "1rem" }}>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default UserElement