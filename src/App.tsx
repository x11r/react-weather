import React from "react"
// import logo from './logo.svg';

import { Routes, Route } from "react-router-dom"

import About from "./About"
import Home from "./Home"
import WeatherIndex from "./Weather/Weather"

import "./App.css"

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/weather" element={<WeatherIndex />} />
            </Routes>
        </div>
    );
}

