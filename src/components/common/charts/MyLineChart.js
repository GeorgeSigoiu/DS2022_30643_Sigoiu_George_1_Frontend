import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

//https://recharts.org/en-US/guide/getting-started
const MyLineChart = ({ data }) => {

    return (
        <LineChart width={700} height={300} data={data} >
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}

export default MyLineChart