const apiKey = '77245b658e8beb7b14d00f090d9ded4f';
const container = document.querySelector('.container');
const form = document.querySelector('#weather-form');
const city = document.querySelector('.city-name');

form.addEventListener('submit', event => {
  event.preventDefault();
  SubmitWeatherForm();
  form.reset();
})

function weatherResult(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

async function SubmitWeatherForm() {
  try {
    const weatherResponse = await weatherResult(city.value, apiKey);
    const weatherData = await weatherResponse.json();
    const sunriseSec = weatherData.sys.sunrise + weatherData.timezone;
    const sunsetSec = weatherData.sys.sunset + weatherData.timezone;
    const dateSunset = new Date(sunsetSec * 1000);
    const dateSunrise = new Date(sunriseSec * 1000);
    const dateSunriseUTC = dateSunrise.toUTCString();
    const dateSunsetUTC = dateSunset.toUTCString();

    const timeStringSunset = dateSunsetUTC[17] + dateSunsetUTC[18] + dateSunsetUTC[19] + dateSunsetUTC[20] + dateSunsetUTC[21];
    const timeStringSunrise = dateSunriseUTC[17] + dateSunriseUTC[18] + dateSunriseUTC[19] + dateSunriseUTC[20] + dateSunriseUTC[21];
    
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const cityName = document.createElement('div');
    cityName.classList.add('city-name');
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-city');
    const cityTemp = document.createElement('div');
    cityTemp.classList.add('temp');
    const tempIcon = document.createElement('img');
    tempIcon.classList.add('icon');
    const description = document.createElement('div');
    description.classList.add('wheater-description');
    const weatherInfos = document.createElement('div');
    weatherInfos.classList.add('weather-infos');
    const containerGeneralInfos = document.createElement('div');
    containerGeneralInfos.classList.add('container-general-infos');
    const generalInfos = document.createElement('div');
    generalInfos.classList.add('general-infos');
    const containerBox = document.createElement('div');
    containerBox.classList.add('main-container');
    const humidity = document.createElement('div');
    humidity.classList.add('humidity');
    const minMax = document.createElement('div');
    minMax.classList.add('minmax-temp');
    const pressure = document.createElement('div');
    pressure.classList.add('pressure');
    const wind = document.createElement('div');
    wind.classList.add('wind-velocity');
    const sunrise = document.createElement('div');
    sunrise.classList.add('city-sunrise');
    const sunset = document.createElement('div');
    sunset.classList.add('city-sunset');
    const feelsLike = document.createElement('div');
    feelsLike.classList.add('temp-feelslike');

    cityName.innerHTML = `<span class="city">${weatherData.name}</span> <sup>${weatherData.sys.country}</sup>`;
    cityTemp.innerHTML = `<span class="city-temp">${Math.round(weatherData.main.temp)}<sup>°C</sup></span>`;
    tempIcon.setAttribute('src', `./assets/${weatherData.weather[0].icon}.svg`);
    description.innerHTML = `<span class="weather-description">${weatherData.weather[0].description}</span>`;
    humidity.innerHTML = `<img src="./assets/humidity.svg"/> <span>Umidade: ${weatherData.main.humidity}%</span>`;
    minMax.innerHTML = `<img src="./assets/minmax.svg"/> <span>Max./Mín.: ${Math.round(weatherData.main.temp_max)}°/${Math.round(weatherData.main.temp_min)}°</span>`;
    pressure.innerHTML = `<img src="./assets/pressure.svg"/> <span>Pressão: ${weatherData.main.pressure} Pa</span>`;
    wind.innerHTML = `<img src="./assets/wind.svg"/> <span>Vento: ${(weatherData.wind.speed * 3.6).toFixed(2)} km/h</span>`;
    sunrise.innerHTML = `<img src="./assets/sunrise.svg"/> <span>Nascer do Sol: ${timeStringSunrise}h</span>`;
    sunset.innerHTML = `<img src="./assets/sunset.svg"/> <span>Pôr do Sol: ${timeStringSunset}h</span>`;
    feelsLike.innerHTML = `<img src="./assets/feels-like.svg"/> <span>Sensação térmica: ${Math.round(weatherData.main.feels_like)}°C</span>`

    container.appendChild(containerBox);
    containerBox.appendChild(cardContainer);
    containerBox.appendChild(containerGeneralInfos);
    containerGeneralInfos.appendChild(generalInfos);
    cardContainer.appendChild(weatherInfos);
    weatherInfos.appendChild(cityName);
    weatherInfos.appendChild(cityTemp);
    weatherInfos.appendChild(tempIcon);
    weatherInfos.appendChild(description);
    generalInfos.appendChild(feelsLike);
    generalInfos.appendChild(sunrise);
    generalInfos.appendChild(sunset);
    generalInfos.appendChild(minMax);
    generalInfos.appendChild(humidity);
    generalInfos.appendChild(pressure);
    generalInfos.appendChild(wind);

  } catch (error) {
    throw(error);
  }
}