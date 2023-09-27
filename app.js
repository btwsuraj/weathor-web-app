const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const unitSelect = document.getElementById('unitSelect');

const apiKey = '6f6b0313d3c48289c9276d9d42fe8001'; //Api key of my acc

getWeatherBtn.addEventListener('click', () => {
  const location = locationInput.value;
  const unit = unitSelect.value;

  // Clear previous weather and error messages
  weatherDisplay.innerHTML = '';
  errorDisplay.innerHTML = '';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) { //Weather data found
        const weatherInfo = data.weather[0];
        const mainInfo = data.main;
        const windInfo = data.wind;

        const weatherHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${mainInfo.temp} &deg;${unit === 'imperial' ? 'F' : 'C'}</p>
          <p>Humidity: ${mainInfo.humidity}%</p>
          <p>Weather: ${weatherInfo.description}</p>
          <p>Wind Speed: ${windInfo.speed} m/s</p>
        `;

        weatherDisplay.innerHTML = weatherHTML;
      } else { //not found
        errorDisplay.innerHTML = 'Location not found. Please try again.';
      }
    })
    .catch(error => {
      errorDisplay.innerHTML = 'Error fetching weather data. Please try again later.';
    });
});
