import React from "react"
import { Link } from "react-router-dom"

export default class Home extends React.Component<NonNullable<unknown>> {

    componentDidMount = () => {
        console.log('==== did mount ====')
        // this.getWeather()
    }
    componentWillUnmount = () => {
        console.log('==== componentWillUnmount ====')
    }

    render () {
        return (
            <div>
                <h2>Home</h2>
                <div>
                    <ul>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/weather">Weather</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
