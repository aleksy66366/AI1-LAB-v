document.addEventListener('DOMContentLoaded', function () {
    //const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
    //const apiKey = '01442ab59654c0ca0861ad52a53ea9e1';
    const apiKey = '01442ab59654c0ca0861ad52a53ea9e1';
    const apiUrlCurrent = 'https://api.openweathermap.org/data/2.5/weather';
    const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast';

    const button = document.getElementById('pogoda');
    const input = document.getElementById('text');
    const currentWeatherDiv = document.getElementById('currentWeather');
    const dayForecastDiv = document.getElementById('dayForecast');

    button.addEventListener('click', function () {
        const cityName = input.value;

        // Zapytanie do API Current Weather za pomocą XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrlCurrent}?q=${cityName}&appid=${apiKey}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const currentWeatherData = JSON.parse(xhr.responseText);
                displayCurrentWeather(currentWeatherData);
                console.log(currentWeatherData);
            } else {
                console.error('Błąd w zapytaniu do API Current Weather');
            }
        };
        xhr.send();

        // Zapytanie do API 5 day forecast za pomocą Fetch API
        fetch(`${apiUrlForecast}?q=${cityName}&appid=${apiKey}`)
            .then(response => response.json())
            .then(forecastData => {
                displayForecast(forecastData);
                console.log(forecastData);
            })
            .catch(error => {
                console.error('Błąd w zapytaniu do API 5 day forecast', error);
            });
    });

    function displayCurrentWeather(data) {
        // Funkcja do wyświetlania danych pogodowych bieżącej
        currentWeatherDiv.innerHTML = `<div class="weather-item">Current Weather: ${data.weather[0].description}</div>`;
    }

    function displayForecast(data) {
        // Funkcja do wyświetlania danych prognozy na 5 dni
        dayForecastDiv.innerHTML = '';

        for (let i = 0; i < data.list.length; i += 8) {
            const forecastItem = data.list[i];
            const date = new Date(forecastItem.dt * 1000);
            const forecastDate = date.toLocaleDateString();
            const forecastDescription = forecastItem.weather[0].description;

            dayForecastDiv.innerHTML += `<div class="weather-item">${forecastDate}: ${forecastDescription}</div>`;
        }
    }
});
