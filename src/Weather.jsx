import React, { useState } from 'react'
import './Weather.css';

const api = {
  key: "c9fff31b810ac9abd5d2e85e628a0fcb",
  base:"https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = evt => {
    if (evt.key == "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(res => res.json()).then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
        
       });  
    }
  }

  const dateBuilder = (d) => {
    let months = ["january", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
     
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  let className = 'app'; // default class

if (typeof weather.main !== "undefined") {
  if (weather.main.temp > 16) {
    className = 'app warm'; 
  } else {
    className = 'app'; 
  }
}
  return (
     <div className={className}>
      <main>
        <div className="search-box">
          <input type='text' className='search-bar' placeholder='Search' value={query} onChange={e => setQuery(e.target.value)} onKeyPress={search}/>
        </div>
        {(typeof weather.name != "undefined") ? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>  
          </div>
        </div>
        ) : (' ')
        }
        
      </main>
    </div>
  )
}

export default Weather