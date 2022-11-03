import React from 'react'

const AdminDashboard = () => {

    return (
        <>
            <div style={{ height: "200vh" }}>
                <div style={{ width: "500px", overflow: "auto" }}>
                    {localStorage.getItem("access_token")}
                </div>
                <div style={{ width: "500px", overflow: "auto" }}>
                    {localStorage.getItem("refresh_token")}
                </div>
            </div>
        </>

    )
}

export default AdminDashboard