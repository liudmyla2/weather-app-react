import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
    const[weatherData, setWeatherData] = useState({ ready: false });
    function handleResponse(response) {
        setWeatherData({
            ready: true,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            date: "Wednesday 07:00",
            description: response.data.weather[0].description,
            iconUrl: "",
            wind: response.data.wind.speed,
            city: response.data.name
        });
    }

    if (weatherData.ready) {
        return (
            <div className="Weather">
                <form>
                    <div className="row">
                        <div className="col-9">
                            <input
                                type="search"
                                placeholder="Enter a city..."
                                className="form-control"
                                autoFocus="on"
                            />
                        </div>
                        <div className="col-3">
                            <input
                                type="submit"
                                value="Search"
                                className="btn btn-primary w-100"
                            />
                        </div>
                    </div>
                </form>
                <h1>{weatherData.city}</h1>
                <ul>
                    <li>{weatherData.date}</li>
                    <li className="text-capitalize">{weatherData.description}</li>
                </ul>
                <div className="row mt-3">
                    <div className="col-6">
                        <div className="clearfix">
                            <img
                                src={weatherData.iconUrl}
                                alt={weatherData.description}
                                className="float-left"
                            ></img>
                            <div className="float-left">
                                <span className="temperature">
                                    {Math.round(weatherData.temperature)}
                                </span>
                                <span className="unit">°C</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <ul>
                            <li>Precipitation: {weatherData.precipitation}%</li>
                            <li>Humidity: {weatherData.humidity}%</li>
                            <li>Wind: {weatherData.wind} km/h</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    } else {
        const apiKey = "be81f193e065bf5feb2d944c7336968b";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    
        return "Loading...";
    }
}