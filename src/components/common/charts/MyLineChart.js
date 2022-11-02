import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

//https://recharts.org/en-US/guide/getting-started
const MyLineChart = ({ device }) => {

    const data = [
        { date: "23 Oct", time: "0:00", value: 2 },
        { date: "23 Oct", time: "1:00", value: 2 },
        { date: "23 Oct", time: "2:00", value: 2 },
        { date: "23 Oct", time: "3:00", value: 2 },
        { date: "23 Oct", time: "4:00", value: 2 },
        { date: "23 Oct", time: "5:00", value: 2 },
        { date: "23 Oct", time: "6:00", value: 2 },
        { date: "23 Oct", time: "7:00", value: 3 },
        { date: "23 Oct", time: "8:00", value: 1 },
        { date: "23 Oct", time: "9:00", value: 2 },
        { date: "23 Oct", time: "10:00", value: 10 },
        { date: "23 Oct", time: "11:00", value: 5 },
        { date: "23 Oct", time: "12:00", value: 25 },
        { date: "23 Oct", time: "13:00", value: 6 },
        { date: "23 Oct", time: "14:00", value: 10 },
        { date: "23 Oct", time: "15:00", value: 4 },
        { date: "23 Oct", time: "16:00", value: 20 },
        { date: "23 Oct", time: "17:00", value: 11 },
        { date: "23 Oct", time: "18:00", value: 9 },
        { date: "23 Oct", time: "19:00", value: 9 },
        { date: "23 Oct", time: "20:00", value: 9 },
        { date: "23 Oct", time: "21:00", value: 9 },
        { date: "23 Oct", time: "22:00", value: 9 },
        { date: "23 Oct", time: "23:00", value: 9 }
    ]

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