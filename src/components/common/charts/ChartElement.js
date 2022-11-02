import React from 'react'
import MyBarChart from './MyBarChart'
import MyLineChart from './MyLineChart'
import './chart_element.css'
const ChartElement = ({ device }) => {

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
            <ul >
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
            <div className='tab-content'>
                <div id={`line-chart-${device.id}`} className='tab-pane fade active show'>
                    <MyLineChart device={device} />
                </div>
                <div id={`bar-chart-${device.id}`} className='tab-pane fade'>
                    <MyBarChart device={device} />
                </div>
            </div>
        </div>
    )
}

export default ChartElement