//Current Date and Time
function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let date = currentDate.getDate();
  if (date === 1) {
    date = `${date}st`;
  }
  if (date === 2) {
    date = `${date}nd`;
  } else {
    date = `${date}th`;
  }
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${date}, ${hours}.${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <img
                  src=""
                  alt="Clear Sky"
                  class="forecast-icon"
                  id="forecast-icon"
                />
                <div class="weekday">${day}</div>
                <div class="forecast-temperatures">
                  <span class="forecast-max-temp">8° </span>
                  <span class="forecast-min-temp"> 2°</span>
                </div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Button - location icon - current Geolocation
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "5f94bb4cb0471f5d3ec1dfdfec61e362";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosition);

//Current Weather API for searched location
function showTemperature(response) {
  displayForecast();

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#location-input").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].main);
}

function searchedLocation(city) {
  let unit = "metric";
  let apiKey = "5f94bb4cb0471f5d3ec1dfdfec61e362";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

//Search bar
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchedLocation(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElements = document.querySelector("#current-temp");

  celsiusLink.classList.remove("celsius");
  fahrenheitLink.classList.add("celsius");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElements.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//Celsius
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("celsius");
  fahrenheitLink.classList.remove("celsius");
  let temperatureElements = document.querySelector("#current-temp");
  temperatureElements.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

//location shown when reload(default location)
searchedLocation("Bern");
