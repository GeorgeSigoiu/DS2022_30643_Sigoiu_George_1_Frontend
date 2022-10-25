import React from 'react'

const AdminDashboard = ({ tokens, setTokens }) => {

    return (
        <>
            <div style={{ height: "200vh" }}>
                <div style={{ width: "500px", overflow: "auto" }}>
                    {tokens[0]}
                </div>
                <div style={{ width: "500px", overflow: "auto" }}>
                    {tokens[1]}
                </div>
            </div>
        </>

    )
}

export default AdminDashboard