import React from "react";
import './CityWeather.css'




export default function CityWeather(props: { className: string, city: string, country: string, temperature: number, forecast: { dt: number; main: { temp: number; }; weather: { icon: any; }[]; }[], min: number, max: number, feelsLike: number, celsius: string, description: string, windSpeed: number, srcImg: string, date: string, day: string, time: string, humidity: any, pressure: any, visibility: any, gust: any, direction: any }) {

    let windDirection = { transform: `rotate(${props.direction}deg)` }

    const cardinalDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    const index = Math.round(props.direction / 45) % 8;
    const cardinalDirection = cardinalDirections[index];





    return (
        <div className="weather-container">
            <div className="left-container">
                <div className="date">
                    <p>{props.day} {props.date}</p>
                    <p>{props.time}</p>

                </div>
                <h2>{props.city}, {props.country}</h2>
                <div className="temp">
                    <div className="weather-icon-container">
                        <img className="icon" src={props.srcImg} alt='icon'></img>
                        <p>{props.temperature}{props.celsius}</p>

                    </div>

                </div>

                <p>{props.description}</p>
                <div className="min-max">
                    <p>Feels Like {props.feelsLike} °C</p>
                    <p>Min: {props.min} °C</p>
                    <p>Max: {props.max} °C</p>
                </div>


            </div>
            <div className="right-container">
                <div className="forecast">
                    {props.forecast && props.forecast.map((item: {
                        weather: any; dt: number; main: { temp: number; };
                    }, index: React.Key | null | undefined) => {
                        const forecastDate = new Date(item.dt * 1000);
                        // Format to get short weekday name.
                        const dayName = forecastDate.toLocaleDateString(undefined, { weekday: 'short' });
                        // Assume temperature is in item.main.temp
                        const temp = Math.round(item.main.temp);
                        // Get the icon code from the weather array
                        const icon = item.weather[0].icon;
                        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                        return (
                            <div key={index} className="forecast-day">
                                <p>{dayName}</p>
                                <img src={iconUrl} alt='icon'></img>

                                <p >{temp}°C</p>
                            </div>
                        );
                    })}
                </div>
                <div className="bottom-container">
                    <div className="bottom-top">
                        <div>

                            <img src={require("./humidity.png")} alt="humidity"></img>
                            <div className="attribute">
                                <p>Humidity</p>
                                <p className="value">{props.humidity}</p>
                            </div>

                        </div>

                        <div>
                            <img src={require("./pressure.png")} alt="pressure"></img>
                            <div className="attribute">
                                <p>Pressure</p>
                                <p className="value">{props.pressure}</p>
                            </div>

                        </div>
                        <div>
                            <img src={require("./eye.png")} alt="visibility"></img>
                            <div className="attribute">
                                <p>Visibility</p>
                                <p className="value">{props.visibility} m</p>
                            </div>

                        </div>
                    </div>
                    <div className="bottom-bottom">
                        <div>
                            <img src={require("./wind.png")} alt="windspeed"></img>
                            <div className="attribute">
                                <p>Wind speed</p>
                                <p className="value">{props.windSpeed} m/s</p>
                            </div>

                        </div>
                        <div>
                            <img src={require("./gust.png")} alt="wind gust"></img>
                            <div className="attribute">
                                <p>Wind gust</p>
                                <p className="value">{props.gust} m/s</p>
                            </div>

                        </div>
                        <div>
                            <img src={require("./arrow.png")} alt="wind direction" style={windDirection}></img>
                            <div className="attribute">
                                <p>Direction</p>
                                <p className="value">{cardinalDirection}</p>
                            </div>

                        </div>
                    </div>


                </div>


            </div>




        </div >
    );
}