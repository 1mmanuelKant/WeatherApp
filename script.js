const apiKey = '77245b658e8beb7b14d00f090d9ded4f';
const container = document.querySelector('.container')
const form = document.querySelector('#weather-form');
const city = document.querySelector('.city-name');

form.addEventListener('submit', event => {
  event.preventDefault();
  SubmitWeatherForm();
})

function weatherResult(city, apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

async function SubmitWeatherForm() {
  try {
    const weatherResponse = await weatherResult(city.value, apiKey);
    const weatherData = await weatherResponse.json();
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-city')
    const countryName = document.createElement('div');
    countryName.classList.add('country')
    const cityTemp = document.createElement('div');
    cityTemp.classList.add('temp')
    const tempIcon = document.createElement('img');
    tempIcon.classList.add('icon')
    countryName.innerHTML = `País: ${weatherData.sys.country}`
    cityTemp.innerHTML = `Temperatura Atual: ${weatherData.main.temp}°C`
    console.log(weatherData)
  } catch (error) {
    console.log(error);
  }
}