let now = new Date();
let p = document.querySelector("p");

let date = now.getDate();

let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
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
let day = days[now.getDay()];

p.innerHTML = `${day} ${date} ${hours}:${minutes}`;

function cityChange(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input");
  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = currentCity.value;
}

//let searchForm = document.querySelector("#search-form");
//searchForm.addEventListener("submit", cityChange);

//search for city
function searchCity(event) {
  event.preventDefault();
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let cityName = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// showing the weather
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  axios.get(apiUrl).then(showWeather);
}
