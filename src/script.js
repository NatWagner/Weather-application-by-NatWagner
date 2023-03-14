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
  document.querySelector("#location-input").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
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

//location shown when reload(default location)
searchedLocation("Bern");
