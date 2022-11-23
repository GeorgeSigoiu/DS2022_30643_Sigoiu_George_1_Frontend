import React from 'react'
import "../../css/user_sticker.css"
import avatarAdmin from "../../images/manager.png"
import avatarClient from "../../images/client.png"
import { useNavigate } from 'react-router-dom'

const UserSticker = ({ userType }) => {

    let avatar;
    if (userType === "admin") {
        avatar = avatarAdmin
    } else {
        avatar = avatarClient
    }

    const navigate = useNavigate()

    function goToDashboard() {
        navigate(`/${userType}`)
    }

    return (
        <div id="sticker" onClick={goToDashboard} style={{ cursor: "pointer" }}>
            <div className='container-image'>
                <span className="navbar-brand" href="#">
                    <img src={avatar} alt="Avatar Logo" className="rounded-pill" />
                </span>
            </div>
        </div >
    )
}

export default UserSticker