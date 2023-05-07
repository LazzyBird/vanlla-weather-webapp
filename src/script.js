function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let apiKey = "242c3086ae8a4o123efeca4t0ba430f7";
let cityName = "Odesa"; //default city
let units = "metric"; //default units
//units switcher
const metricSwitch = document.getElementById("metric-switch");
const imperialSwitch = document.getElementById("imperial-switch");

//displays all needed parameters back in html
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let feelsElement = document.querySelector("#feelsLike");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let countryElement = document.querySelector("#country");
  let weatherElement = document.querySelector("#weather");
  let pressureElement = document.querySelector("#pressure");
  let lastUpdate = document.querySelector("#updated");
  let weatherIconElement = document.querySelector("#weatherIcon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  countryElement.innerHTML = response.data.country;
  weatherElement.innerHTML = response.data.condition.description;
  pressureElement.innerHTML = response.data.temperature.pressure;
  lastUpdate.innerHTML = formatDate(response.data.time * 1000);
  //iconName = response.data.weather[0].icon;
  //let iconUri = `https://openweathermap.org/img/wn/${iconName}.png`;
  weatherIconElement.src = response.data.condition.icon_url;
  cityName = response.data.name;
  if (units === "metric") {
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
    speedUnit.innerHTML = "km/h";
  } else if (units === "imperial") {
    let mph = response.data.wind.speed;
    windspeedElement.innerHTML = Math.round(mph);
    speedUnit.innerHTML = "mph";
  }
  getForecast(response.data.coordinates);
}

function inputCity(event) {
  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#cityInput");
  let cityNameInput = cityInput.value.trim();
  if (cityNameInput === "") {
    cityInput.placeholder = "Please enter a city";
    cityInput.value = "";
    return;
  }

  cityName = cityNameInput; // update the city name with the user input
  city.innerHTML = cityName;
  cityInput.value = "";
  let apiUri = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
  axios.get(apiUri).then(displayTemperature);
}
let apiUri = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
axios.get(apiUri).then(displayTemperature);

document.getElementById("search-button").addEventListener("click", inputCity);
document
  .getElementById("cityInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      inputCity();
    }
  });

/*metricSwitch.addEventListener("click", () => {
  // Set the units to metric and update the API request
  units = "metric";
  updateWeather(units, coordinates);
});

imperialSwitch.addEventListener("click", () => {
  // Set the units to imperial and update the API request
  units = "imperial";
  updateWeather(units, coordinates);
});

// Update the weather data using the new units
 function updateWeather(units) {
  const apiCurrentUri = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
  const apiForecastUri = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=${units}`;
  axios.get(apiCurrentUri).then(displayTemperature);
  axios.get(apiForecastUri).then(getForecast);
} */

function showForecast(response) {
  let forecast = null;
  console.log(response.data);
  let forecastElement = document.querySelector("#forecastRow");
  let forecastHtml = `<div class="row">`;
  for (let index = 1; index < 5; index++) {
    forecast = response.data.daily[index];
    forecastHtml += ` <div class="col-3 forecastCol">
              <p>${formatDay(forecast.time)}</p>
              <div>
                <img
                  class="weatherIconForecast"
                  src= "${forecast.condition.icon_url}"
                  width="30px"
                />
              </div>
               <p><span id="maxTemp">${Math.round(
                 forecast.temperature.maximum
               )}</span>° <span id="minTemp">${Math.round(
      forecast.temperature.minimum
    )}</span>°</p>
            </div>`;
  }
  forecastHtml += `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "242c3086ae8a4o123efeca4t0ba430f7";
  let apiUri = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUri).then(showForecast);
}

//setInterval(displayTemperature, 10000); //function displaytemp refresh data every 10s
//https://api.shecodes.io/weather/v1/forecast?lat=38.71667&lon=-9.13333&key=242c3086ae8a4o123efeca4t0ba430f7&units=metric
//https://relaxed-entremet-416ea9.netlify.app/#
