import React from 'react'
import './dashboard.css'

const Dashboard = ({ loggedUser, image }) => {
    return (
        <div id="client-dashboard">
            <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
                <div class="card p-4">
                    <div class=" image d-flex flex-column justify-content-center align-items-center">
                        <button class="btn btn-secondary">
                            <img src={image} height="100" width="100" />
                        </button>
                        <span class="name mt-3">{loggedUser.name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard