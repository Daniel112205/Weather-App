import axios from "axios";
import { useEffect, useState } from "react";

const Geolocation = () => {
    const Key = '4fafbe59675aad5b8c60ad3431383f39';//Key for API Weather
    //For get values
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [descriptionWeather, setDescriptionWeather] = useState("");
    //Get Geolocation
    const getLocation = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
     //Get Weather API
    useEffect(() => {
        const fetchWeather = async () => {
            try {
              //Access for location
              window.navigator.geolocation.getCurrentPosition(getLocation);
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}&units=metric`);
              setTemperature(response.data.main.temp);
              setCityName(response.data.name);
              setCountryName(response.data.sys.country);
              setWeather(response.data.weather[0].main);
              setDescriptionWeather(response.data.weather[0].description);
            } catch (err) {
              console.error(err);
            }
        };
        fetchWeather();
    }, [latitude, longitude]);

    return (
        <div className="container">
            <div className="row">
                <div>
                    <h1 className="title margin">City: {cityName} Country: {countryName}</h1>
                </div>
                <div>
                    <h2 className="margin temperature">{temperature}ºC</h2>
                    <h2 className="margin weather">{weather} {descriptionWeather}</h2>
                </div>
            </div>
        </div>
    );
}

export default Geolocation;