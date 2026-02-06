"use strict";
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const temperatureText = document.getElementById("temperature");
const humidityText = document.getElementById("humidity");
const conditionText = document.getElementById("condition");
const errorMessageText = document.getElementById("errorMessage");
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
function clearUI() {
    temperatureText.textContent = "";
    humidityText.textContent = "";
    conditionText.textContent = "";
    errorMessageText.textContent = "";
}
function showError(message) {
    errorMessageText.textContent = message;
}
async function getCoordinates(city) {
    try {
        console.log("Fetching coordinates for:", city);
        const response = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`);
        const data = await response.json();
        console.log("Geocode data:", data);
        if (!data.results || data.results.length === 0)
            return null;
        return {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude
        };
    }
    catch (error) {
        console.error("Geocode error:", error);
        return null;
    }
}
async function fetchWeather(lat, lon) {
    try {
        console.log("Fetching weather for:", lat, lon);
        const response = await fetch(`${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        console.log("Weather data:", data);
        if (!data.current_weather) {
            showError("Weather data unavailable");
            return;
        }
        displayWeather(data);
    }
    catch (error) {
        console.error("Weather fetch error:", error);
        showError("Network error. Try again.");
    }
}
function displayWeather(data) {
    const current = data.current_weather;
    temperatureText.textContent = `Temperature: ${current.temperature} °C`;
    humidityText.textContent = `Wind Speed: ${current.windspeed} km/h`;
    conditionText.textContent = `Weather Code: ${current.weathercode}`;
}
weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearUI();
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter city name");
        return;
    }
    const coords = await getCoordinates(city);
    if (!coords) {
        showError("City not found");
        return;
    }
    fetchWeather(coords.latitude, coords.longitude);
});
