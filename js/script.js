let weatherAPIKey = 'e4f2ba0702c0090504c859d78418a916'
let weatherBaseEndPoint =
  'https://api.openweathermap.org/data/2.5/weather?appid=' +
  weatherAPIKey +
  '&units=metric'

// Variable declaration for selecting HTML input value

let searchInp = document.querySelector('.weather_search')
let city = document.querySelector('.weather_city')
let day = document.querySelector('.weather_day')
let humidity = document.querySelector('.weather_indicator--humidity>.value')
let wind = document.querySelector('.weather_indicator--wind>.value')
let pressure = document.querySelector('.weather_indicator--pressure>.value')
let temperature = document.querySelector('.weather_temperature>.value')
let image = document.querySelector('.weather_image')

let getWeatherByCityName = async (city) => {
  let endPoint = weatherBaseEndPoint + '&q=' + city
  let response = await fetch(endPoint)
  let weather = await response.json()
  return weather
}

let updateCurrentWeather = (data) => {
  city.innerText = data.name
  day.innerText = dayOfWeek()
  humidity.innerText = data.main.humidity
  pressure.innerText = data.main.pressure
  temperature.innerText = data.main.temp
  let windDirection
  let deg = data.wind.deg
  if (deg > 22.5 && deg <= 67.5) {
    windDirection = 'North-East'
  } else if (deg > 67.5 && deg <= 112.5) {
    windDirection = 'East'
  } else if (deg > 112.5 && deg <= 157.5) {
    windDirection = 'South-East'
  } else if (deg > 157.5 && deg <= 202.5) {
    windDirection = 'South'
  } else if (deg > 202.5 && deg <= 247.5) {
    windDirection = 'South-West'
  } else if (deg > 247.5 && deg <= 292.5) {
    windDirection = 'West'
  } else if (deg > 292.5 && deg <= 337.5) {
    windDirection = 'North-West'
  } else {
    windDirection = 'North'
  }
  wind.innerText = windDirection = ',' + data.wind.speed
}
let dayOfWeek = () => {
  let today = new Date().toLocaleDateString('en-En', { weekday: 'long' })
  return today
}

let weatherForCity = async (city) => {
  let weather = await getWeatherByCityName(city)
  updateCurrentWeather(weather)
  console.log(weather)
}
searchInp.addEventListener('keydown', async (e) => {
  if (e.keyCode === 13) {
    weatherForCity(searchInp.value)
  }
})
