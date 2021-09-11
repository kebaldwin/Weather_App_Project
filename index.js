let currentData = new Date();

function formatDate(date) {
  let todayDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[todayDay];

  let todayDate = date.getDate();

  let todayMonth = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  console.log(months);
  let month = months[todayMonth];

  let year = date.getFullYear();

  return `${day}, ${todayDate} ${month} ${year}`;
}

let dateElement = document.querySelector("h2");
dateElement.innerHTML = formatDate(currentData);

function updateTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let updatedTime = `${hours}:${minutes}`;
  return updatedTime;
}

let timeElement = document.querySelector("h3");
timeElement.innerHTML = updateTime(currentData);

function displayWeatherConditions(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#tempNow").innerHTML = `${temperature}`;
}

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let apiKey = "c4cd19b1bf4fcc9bdffc7f2ac1741ca9";
  let city = response.data.name;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempNow");
  temperatureElement.innerHTML = ` ${temperature} `;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#forminput");
  let city = `${searchInput.value}`;
  let apiKey = "c4cd19b1bf4fcc9bdffc7f2ac1741ca9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayWeatherConditions);
}