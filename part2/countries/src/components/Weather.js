import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather({ name }) {
  const [weather, setWeather] = useState(null);

  const { current } = weather || {};
  const { temperature, weather_icons, wind_speed, wind_dir } = current || {};

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    if (name) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`
        )
        .then((res) => setWeather(res.data));
    }
  }, [name]);

  if (!weather) {
    return <div></div>;
  }

  return (
    <div>
      <h2>Weather in {name}</h2>
      <div>
        <strong>temperature: </strong>
        {temperature} Celcius
      </div>
      <div>
        <img src={weather_icons[0]} alt={`Weather of ${name}`} />
      </div>
      <div>
        <strong>wind: </strong>
        {wind_speed} mph direction {wind_dir}
      </div>
      <br />
    </div>
  );
}

export default Weather;
