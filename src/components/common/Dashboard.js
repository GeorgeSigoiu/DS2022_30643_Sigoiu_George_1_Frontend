import React from 'react'
import './dashboard.css'

const Dashboard = ({ loggedUser, image }) => {
    return (
        <div id="client-dashboard">
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div className="card p-4">
                    <div className=" image d-flex flex-column justify-content-center align-items-center">
                        <button className="btn btn-secondary">
                            <img src={image} height="100" width="100" />
                        </button>
                        <span className="name mt-3">{loggedUser.name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard