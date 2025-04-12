import { useEffect, useState } from "react";
import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY
// https://openweathermap.org/
// export VITE_SOME_KEY=xxxxxxxx && npm run dev // For Linux/macOS Bash
// ($env:VITE_SOME_KEY="xxxxxxxx") -and (npm run dev) // For Windows PowerShell
// set "VITE_SOME_KEY=xxxxxxxx" && npm run dev // For Windows cmd.exe

const weather_URL = 'https://api.openweathermap.org/data/2.5/weather'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)
  
    useEffect(() => {
      const [lat, lon] = country.capitalInfo.latlng
      const url = `${weather_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
      axios.get(url).then((response) => setWeather(response.data))
    })
  
    if (!weather) {
      return null
    }
  
    const weatherIcon = weather.weather[0].icon
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  
    return (
      <>
        <h2>Weather in {country.capital}</h2>
        <div>Temperature {weather.main.temp} Celsius</div>
        <img
          src={weatherIconUrl}
          alt={`Weather icon of ${weather.weather[0].description}`}
        />
        <div>Wind {weather.wind.speed} m/s</div>
      </>
    )
  }
  
  export default Weather