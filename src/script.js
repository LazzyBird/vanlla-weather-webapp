function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let feelsElement = document.querySelector("#feelsLike");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let countryElement = document.querySelector("#country");
  let weatherElement = document.querySelector("#weather");
  let pressureElement = document.querySelector("#pressure");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  countryElement.innerHTML = response.data.sys.country;
  weatherElement.innerHTML = response.data.weather[0].description;
  pressureElement.innerHTML = response.data.main.pressure;
}
let apiKey = "4085d4e1d22f7753a9278110dff3ae74";
let apiUri = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=metric`;
axios.get(apiUri).then(displayTemperature);
