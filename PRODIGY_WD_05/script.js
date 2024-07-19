const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "de714cd3c940a754c3d5d4e9521f67a8"; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                    <h3>${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h3>
                </li>`;
    }
};

const fetchWeatherData = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const cityName = data.city.name;
                const weatherList = data.list;
                currentWeatherDiv.innerHTML = createWeatherCard(cityName, weatherList[0], 0);

                weatherCardsDiv.innerHTML = weatherList.slice(1, 6).map((item, index) => createWeatherCard(cityName, item, index + 1)).join("");
            } else {
                alert("City not found!");
            }
        })
        .catch(error => console.error("Error fetching weather data:", error));
};

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === "200") {
                        const cityName = data.city.name;
                        const weatherList = data.list;
                        currentWeatherDiv.innerHTML = createWeatherCard(cityName, weatherList[0], 0);

                        weatherCardsDiv.innerHTML = weatherList.slice(1, 6).map((item, index) => createWeatherCard(cityName, item, index + 1)).join("");
                    } else {
                        alert("Unable to fetch weather data for your location.");
                    }
                })
                .catch(error => console.error("Error fetching weather data:", error));
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
