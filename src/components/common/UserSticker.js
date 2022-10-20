import React from 'react'
import "./user_sticker.css"

const UserSticker = ({ userType }) => {

    let type;
    if (userType === "admin") {
        type = "A"
    } else {
        type = "C"
    }

    return (
        <div id="sticker">
            <div className='container1'>
                <div className='text'>
                    {type}
                </div>
            </div>
        </div>
    )
}

export default UserSticker