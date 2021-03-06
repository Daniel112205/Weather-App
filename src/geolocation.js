import axios from "axios";
import { useEffect, useState } from "react";

const Geolocation = () => {
    const Key = '4fafbe59675aad5b8c60ad3431383f39';//Key for API Weather
    //For get values
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [weatherPressure, setWeatherPressure] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [descriptionWeather, setDescriptionWeather] = useState("");
    const [iconWeather, setIconWeather] = useState("");
    const [speedWeather, setSpeedWeather] = useState("");
    //Get Geolocation
    const getLocation = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
    const fetchWeather = () =>{
        //Access for location
        window.navigator.geolocation.getCurrentPosition(getLocation);
        const getApi = axios(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}&units=metric`,
        {
            method: 'GET'
        }
        )
        return getApi;
    }
     //Get Weather API
    useEffect(() => {
        
        fetchWeather().then(response => {
            setTemperature(response.data.main.temp);
            setCityName(response.data.name);
            setCountryName(response.data.sys.country);
            setWeather(response.data.weather[0].main);
            setWeatherPressure(response.data.main.pressure);
            setIconWeather(response.data.weather[0].icon);
            setDescriptionWeather(response.data.weather[0].description);
            setSpeedWeather(response.data.wind.speed);
        })
    }, [latitude, longitude]);
    return (
        <div className="container">
            <div className="">
                <div>
                    <h1 className="title margin">City: {cityName} Country: {countryName}</h1>
                </div>
                <div>
                    <img src={`http://openweathermap.org/img/wn/${iconWeather}.png`} alt="Icon Weathaer" />
                    <h2 className="margin temperature">{temperature}??C</h2>
                    <h2 className="text">"{descriptionWeather}"</h2>
                    <h2 className="margin text">{weather}</h2>
                    <h2 className="margin props">Pressure: {weatherPressure} mb</h2>
                    <h2 className="margin props">Speed: {speedWeather} m/s</h2>
                </div>
            </div>
        </div>
    );
}

export default Geolocation;