import React from "react"
import { Link } from "react-router-dom"

export default function Home () {
    return (
        <div>
            <h2>Home</h2>
            <div>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
