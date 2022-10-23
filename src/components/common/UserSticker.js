import React from 'react'
import "./user_sticker.css"
import avatarAdmin from "../../images/manager.png"
import avatarClient from "../../images/client.png"

const UserSticker = ({ userType }) => {

    let avatar;
    if (userType === "admin") {
        avatar = avatarAdmin
    } else {
        avatar = avatarClient
    }

    return (
        <div id="sticker">
            <div className='container-image'>
                <span className="navbar-brand" href="#">
                    <img src={avatar} alt="Avatar Logo" className="rounded-pill" />
                </span>
            </div>
        </div >
    )
}

export default UserSticker