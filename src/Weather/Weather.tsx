// import React , { Component } from "react"
import React from "react"
import axios from "axios"
// import { Link } from "react-router-dom"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

import { Line } from "react-chartjs-2"
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, } from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


require("./Weather.scss")

type WeatherData = {
    date: string
    prefecture_id: string
    station_name: string
    temperature_highest: string
    temperature_lowest: string
    created_at: string
    updated_at: string
}

type State = {
    count: number
    weatherData: WeatherData[],
    selectedDateStart: Date,
    selectedDateEnd: Date,
}

// const Today = new Date()
const TodayStart = new Date()
const TodayEnd = new Date()

export default class Weather extends React.Component<NonNullable<unknown>, State, WeatherData> {
    constructor(props: NonNullable<unknown> | Readonly<NonNullable<unknown> | Readonly<State>>) {
        super(props)
        this.state = {
            count: 0,
            weatherData: [],
            selectedDateStart: new Date(),
            selectedDateEnd: new Date(),
        }
    }
    componentDidMount = () => {
        this.getWeather()
    }
    getWeather = () => {
        console.log('==== get weather ====')

        const start = this.state.selectedDateStart
        const end = this.state.selectedDateEnd

        // 選択開始日付
        const dateStart = String(start.getFullYear())
            + ("0" + String(start.getMonth() + 1)).slice(-2)
            + ("0" + String(start.getDate())).slice(-2)

        // 選択最終日付
        const dateEnd = String(end.getFullYear())
            + ("0" + String(end.getMonth() + 1)).slice(-2)
            + ("0" + String(end.getDate())).slice(-2)

        const url = "http://localhost:10101/api/weather/get?"
            + "prefectureId=" + 44
            + "&station=東京"
            + "&startDate=" + dateStart
            + "&endDate=" + dateEnd

        axios.get(url)
            .then((response) => {
                this.setState({
                    count: response.data.count,
                    weatherData: response.data.data
                })

            })
            .catch((error) => {
                // console.log("====")
                console.log(error)
            })
    }

    drawGraph (): JSX.Element {
        // グラフ描画部分

        const labels: string[] = this.state.weatherData.map((weather: WeatherData) => {
            return weather.date
        })

        // 最高気温一覧
        const temperature_highest: string[] = this.state.weatherData.map((weather: WeatherData) => {
            return weather.temperature_highest
        })
        // 最低気温一覧
        const temperature_lowest: string[] = this.state.weatherData.map((weather: WeatherData) => {
            return weather.temperature_lowest
        })

        const data = {
            labels,
            datasets: [
                {
                    label: "最高気温",
                    data: temperature_highest,
                    borderColor: "rgb(255,99,132)"
                },
                {
                    label: "最低気温",
                    data: temperature_lowest,
                    borderColor: "rgb(100,200,200)"
                }
            ]
        }


        const Scale = {
            y: {
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: "温度(°C)",
                    color: "#ff4500",
                    rotate: "vertical",
                    font: {
                        size: 20,
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: "日付",
                    color: "rgb(255,69, 0)",
                    font: {
                        size: 20,
                    }
                }
            }
        }

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top" as const,
                },
                title: {
                    display: true,
                    text: "最高最低気温",
                },
            },
            scales: Scale
        }
        return (
            <Line options={options} data={data} />
        )
    }

    componentWillUnmount = () => {

        // 選択日の開始日のセット
        const date = new Date()
        date.setFullYear(date.getFullYear() - 1)
        this.setState({selectedDateStart: date})
    }

    dailyWeatherList = () => {
        this.getWeather()
    }

    setDateStart = (date: Date) => {
        this.setState({
            selectedDateStart: date
        })
    }

    setDateEnd = (date: Date) => {
        this.setState({
            selectedDateStart: date
        })
    }

    render () {
        return (
            <div>
                <h2>Weather</h2>
                <div>count: { this.state.count }</div>
                <div>
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={this.state.selectedDateStart}
                        onChange={(selectedDateStart) => this.setDateStart(selectedDateStart || TodayStart)}
                    />
                    から

                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={this.state.selectedDateEnd}
                        onChange={(selectedDateEnd) => this.setDateEnd(selectedDateEnd || TodayEnd)}
                    />
                    まで

                    <button
                        onClick={() => this.dailyWeatherList()}
                    >
                        データ取得

                    </button>
                </div>
                <div id="graph">
                    {this.drawGraph()}
                </div>
                <div>
                    <table className="weather-table">
                        <tbody>
                        {this.state.weatherData.map((weather, index) => {
                            return (
                                <tr
                                    key={index}
                                >
                                    <td>{index}</td>
                                    <td>{weather.date}</td>
                                    <td>
                                        {weather.temperature_highest}
                                    </td>
                                    <td>
                                        {weather.temperature_lowest}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
