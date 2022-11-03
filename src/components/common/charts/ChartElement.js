import React, { useState, useEffect } from 'react'
import MyBarChart from './MyBarChart'
import MyLineChart from './MyLineChart'
import './chart_element.css'
import MyDatePicker from './MyDatePicker';
import { getRequest, LINK_GET_CONSUMPTION_FOR_DATE } from '../../requests';
import { requestHandler } from '../../handlers'

const ChartElement = ({ device }) => {

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString())
    const [data, setData] = useState([])
    const [totalEnergyConsumption, setTotalEnergyConsumption] = useState(0)

    function constructData(data) {
        const list = []
        let energy = 0
        for (let i = 0; i < 24; i++) {
            const el = {
                time: i + ":00",
                value: data[i]
            }
            energy = Number(energy) + Number(data[i])
            list.push(el)
        }
        setData(list)
        setTotalEnergyConsumption(energy)
    }

    useEffect(() => {
    }, [data])

    async function getConsumption(date) {
        const response = await requestHandler(getRequest, {
            link: LINK_GET_CONSUMPTION_FOR_DATE.replace("DATE", date.toString()).replace("DEVICEID", device.id),
            payload: {}
        })
        constructData(response)
    }

    useEffect(() => {
        //todo get the values for this date
        getConsumption(selectedDate)
    }, [selectedDate])


    function click(e) {
        const target = e.currentTarget.children[0]
        const id = target.id.replace("ref-", "")
        const lineChart = document.getElementById(`line-chart-${device.id}`)
        const barChart = document.getElementById(`bar-chart-${device.id}`)
        if (id === `line-chart-${device.id}`) {
            lineChart.classList.add("active")
            lineChart.classList.add("show")
            barChart.classList.remove("active")
            barChart.classList.remove("show")
        } else if (id === `bar-chart-${device.id}`) {
            barChart.classList.add("active")
            barChart.classList.add("show")
            lineChart.classList.remove("active")
            lineChart.classList.remove("show")
        }
    }

    return (
        <div id="charts-elements">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ul>
                    <li onClick={e => click(e)}>
                        <a data-toggle="tab" id={`ref-line-chart-${device.id}`}>
                            Line chart
                        </a>
                    </li>
                    <li onClick={e => click(e)}>
                        <a data-toggle="tab" id={`ref-bar-chart-${device.id}`}>
                            Bar chart
                        </a>
                    </li>
                </ul>
                <div style={{ width: "fit-content" }}>
                    <MyDatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
                </div>
            </div>

            <div className='tab-content' style={{ marginLeft: "-2rem" }}>
                <div id={`line-chart-${device.id}`} className='tab-pane fade active show'>
                    <MyLineChart data={data} />
                </div>
                <div id={`bar-chart-${device.id}`} className='tab-pane fade'>
                    <MyBarChart data={data} />
                </div>
            </div>
            <div>
                Total energy consumption: {totalEnergyConsumption} W
            </div>
        </div>
    )
}

export default ChartElement