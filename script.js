console.log("script.js is loaded");
const apiKey = "PCZJC3CA8LPB9WQZK2TN23S3A"; 
const button = document.getElementById("getWeather");
const result = document.getElementById("weatherResult");
const forecastContainer = document.getElementById("forecast");
const forecastTitle = document.getElementById("forecastTitle");

button.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchWeather(city);
  } else {
    result.innerHTML = "<p>Please enter a city name.</p>";
  }
});
document.title = "KARTRYX.com";
function fetchWeather(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.address) {
        const current = data.currentConditions;
        
        result.innerHTML = `
          <h2>${data.resolvedAddress}</h2>
          <p>🌡️ Temp: ${current.temp}°C</p>
          <p>☁️ Condition: ${current.conditions}</p>
          <p>💨 Wind: ${current.windspeed} km/h</p>
          <p>📅 Date: ${data.days[0].datetime}</p>
        `;
        forecastTitle.textContent= ("city");
        forecastTitle.textContent = "5-Day Forecast:";
        forecastContainer.innerHTML = "";

        data.days.slice(0, 5).forEach(day => {
          const card = document.createElement("div");
          card.classList.add("forecast-card");
          card.innerHTML = `
            <h3>${day.datetime}</h3>
            <p>🌡️ High: ${day.tempmax}°C</p>
            <p>🌡️ Low: ${day.tempmin}°C</p>
            <p>☁️ ${day.conditions}</p>
          `;
          forecastContainer.appendChild(card);
        });
      } else {
        result.innerHTML = "<p>City not found. Try again.</p>";
      }

    })
    .catch(error => {
      result.innerHTML = "<p>Error fetching data. Try again later.</p>";
      console.error(error);
    });
}
