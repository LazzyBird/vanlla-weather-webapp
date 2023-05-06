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
let apiKey = "4085d4e1d22f7753a9278110dff3ae74";
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

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  countryElement.innerHTML = response.data.sys.country;
  weatherElement.innerHTML = response.data.weather[0].description;
  pressureElement.innerHTML = response.data.main.pressure;
  lastUpdate.innerHTML = formatDate(response.data.dt * 1000);
  iconName = response.data.weather[0].icon;
  let iconUri = `https://openweathermap.org/img/wn/${iconName}.png`;
  weatherIconElement.src = iconUri;
  cityName = response.data.name;
  if (units === "metric") {
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
    speedUnit.innerHTML = "m/s";
  } else if (units === "imperial") {
    let mph = response.data.wind.speed;
    windspeedElement.innerHTML = Math.round(mph);
    speedUnit.innerHTML = "mph";
  }
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

  let apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUri).then(displayTemperature);
}
let apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
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

metricSwitch.addEventListener("click", () => {
  // Set the units to metric and update the API request
  units = "metric";
  updateWeather(units);
});

imperialSwitch.addEventListener("click", () => {
  // Set the units to imperial and update the API request
  units = "imperial";
  updateWeather(units);
});

// Update the weather data using the new units
function updateWeather(units) {
  const apiUri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUri).then(displayTemperature);
}

function forecastPut() {
  let forecast = document.querySelector("#forecastRow");
  let forecastHtml = `<div class="row">`;
  let weekDays = ["Sun", "Mon", "Tue", "Sat"];
  weekDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="col-3 forecastCol">
              <p>${day}</p>
              <div>
                <img
                  class="weatherIconForecast"
                  src="https://openweathermap.org/img/wn/04n.png"
                  width="30px"
                />
              </div>
               <p><span id="maxTemp">18</span>° <span id="minTemp">12</span>°</p>
            </div>`;
  });
  forecastHtml += `</div>`;
  forecast.innerHTML = forecastHtml;
}

forecastPut();
//setInterval(displayTemperature, 10000); //function displaytemp refresh data every 10s
