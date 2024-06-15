let apiKey = `192135tc4e4o0fafb44cb21e060f9cef`;

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
  fetchWeatherData(searchInputElement.value);
}

function fetchWeatherData(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(`Fetching weather data for ${city} from ${apiUrl}`);
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed" + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data:", data);
      let temperature = data.temperature.current;
      let temperatureElement = document.querySelector("#current-temperature");
      if (temperatureElement) {
        temperatureElement.innerHTML = `${temperature}°C`;
      } else {
        console.error("#current-temperature element not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
