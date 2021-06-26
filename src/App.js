import { useState } from 'react';

const api = {
  key: "aea5bdfa44cb79cb2b25b99f4390908f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState(" ");
  const [weather, setWeather] = useState({});

  const search = evt => {
      if (evt.key === "Enter") {
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
              setWeather(result);
              setQuery(" ");
              console.log(result);
          });
      }
  }

  const dateBuilder = (d) => {
      let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
      let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; 

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "App warm" : "App") : "App "}>
      <main>
        <div className="search-box">
            <input type="text" className="search-bar" placeholder="Rechercher..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
            <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
                <div className="temp">
                    {Math.round(weather.main.temp )}°c
                </div>
                <div className="weather">{weather.weather[0].description}</div>
            </div>
        </div>
        ) : (" ")}
      </main>
    </div>
  );
}

export default App;
