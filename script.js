const apiKey = '77245b658e8beb7b14d00f090d9ded4f';
const container = document.querySelector('.container')
const form = document.querySelector('#weather-form');
const city = document.querySelector('.city-name');

form.addEventListener('submit', event => {
  event.preventDefault();
  SubmitWeatherForm();
  form.reset()
})

function weatherResult(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

async function SubmitWeatherForm() {
  try {
    const weatherResponse = await weatherResult(city.value, apiKey);
    const weatherData = await weatherResponse.json();
    
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
    const infos = document.createElement('div');
    infos.classList.add('weather-infos');

    cityName.innerHTML = `${weatherData.name} <sup>${weatherData.sys.country}</sup>`
    cityTemp.innerHTML = `${weatherData.main.temp}<sup>°C</sup>`
    tempIcon.setAttribute('src', `./assets/${weatherData.weather[0].icon}.svg`);
    

    container.appendChild(cardContainer);
    cardContainer.appendChild(infos);
    infos.appendChild(cityName);
    infos.appendChild(cityTemp);
    infos.appendChild(tempIcon)
    console.log(weatherData)
  } catch (error) {
    console.log(error);
  }
}