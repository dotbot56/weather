document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const address = document.getElementById('address').value;
    const coordinates = await getCoordinates(address);
    const weatherData = await getWeatherData(coordinates.lat, coordinates.lon);
    displayWeatherData(weatherData);
});

async function getCoordinates(address) {
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248be68296ed7a44df88c320eba4f9ecff0&text=${address}`);
    const data = await response.json();
    const coordinates = data.features[0].geometry.coordinates;
    return { lon: coordinates[0], lat: coordinates[1] };
}

async function getWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=13e8b64ea8a93f5d6137d1e24ecbd453`);
    return await response.json();
}

function displayWeatherData(data) {
    document.getElementById('temperature').textContent = `Temperatur: ${data.main.temp} °C`;
    document.getElementById('pressure').textContent = `Luftdruck: ${data.main.pressure} hPa`;
    document.getElementById('humidity').textContent = `Luftfeuchtigkeit: ${data.main.humidity} %`;

    const weatherIcon = document.getElementById('weatherIcon');
    if (data.weather[0].main === 'Clear') {
        weatherIcon.getElementById('sun').style.display = 'block';
        weatherIcon.getElementById('cloud').style.display = 'none';
    } else if (data.weather[0].main === 'Clouds') {
        weatherIcon.getElementById('sun').style.display = 'none';
        weatherIcon.getElementById('cloud').style.display = 'block';
    } else {
        weatherIcon.getElementById('sun').style.display = 'block';
        weatherIcon.getElementById('cloud').style.display = 'block';
    }
}
