let weatherAPIKey = 'e4f2ba0702c0090504c859d78418a916'
let weatherBaseEndPoint =
  'https://api.openweathermap.org/data/2.5/weather?appid=' +
  weatherAPIKey +
  '&units=metric'

let forecastBaseEndpoint =
  'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' +
  weatherAPIKey

// Variable declaration for selecting HTML input value

let searchInp = document.querySelector('.weather_search')
let city = document.querySelector('.weather_city')
let day = document.querySelector('.weather_day')
let humidity = document.querySelector('.weather_indicator--humidity>.value')
let wind = document.querySelector('.weather_indicator--wind>.value')
let pressure = document.querySelector('.weather_indicator--pressure>.value')
let temperature = document.querySelector('.weather_temperature>.value')
let image = document.querySelector('.weather_image')
let forecastBlock = document.querySelector('.weather_forecast')

let getWeatherByCityName = async (city) => {
  let endPoint = weatherBaseEndPoint + '&q=' + city
  let response = await fetch(endPoint)
  let weather = await response.json()
  return weather
}

let getForecastByCityID = async (id) => {
  let endPoint = forecastBaseEndpoint + '&id=' + id
  let result = await fetch(endPoint)
  let forecast = await result.json()
  console.log(forecast)
  let forecastList = forecast.list
  let daily = []
  forecastList.forEach((day) => {
    let date_txt = day.dt_txt
    date_txt = date_txt.replace(' ', 'T')
    let date = new Date(date_txt)
    let hours = date.getHours()
    if (hours === 12) {
      daily.push(day)
    }
  })
  console.log(daily)
  return daily
}

let updateCurrentWeather = (data) => {
  city.innerText = data.name
  day.innerText = dayOfWeek()
  humidity.innerText = data.main.humidity
  pressure.innerText = data.main.pressure
  temperature.innerText =
    data.main.temp > 0
      ? '+' + Math.round(data.main.temp)
      : Math.round(data.main.temp)

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
  wind.innerText = windDirection + ',' + data.wind.speed
}
let dayOfWeek = (
  dt = new Date().getTime() /* generating current time into milli seconds if date (dt in milliseconds) is not passed */,
) => {
  // if (dt === undefined) {
  //   dt = new Date().getTime() // generating current time into milli seconds
  // }
  let today = new Date(dt).toLocaleDateString('en-En', { weekday: 'long' }) //getting day of week from generating date object from millisec.
  return today
}

let weatherForCity = async (city) => {
  let weather = await getWeatherByCityName(city)
  updateCurrentWeather(weather)
  console.log(weather)
  let cityID = weather.id
  let forecast = await getForecastByCityID(cityID)
  updateForecast(forecast)
}
searchInp.addEventListener('keydown', async (e) => {
  if (e.keyCode === 13) {
    weatherForCity(searchInp.value)
  }
})

let updateForecast = (forecast) => {
  forecastBlock.innerHTML = ''
  let forecastItem = ''
  forecast.forEach((day) => {
    let iconUrl =
      'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'
    let temperature =
      day.main.temp > 0
        ? '+' + Math.round(day.main.temp)
        : Math.round(day.main.temp)
    let dayName = dayOfWeek(day.dt * 1000) //day.dt*1000 converting seconds into milliseconds
    console.log(dayName)
    forecastItem += `<article class="weather_forecast_item">
    <img
      src="${iconUrl}"
      alt="${day.weather[0].description}"
      class="weather_forecast_icon"
    />
    <h3 class="weather_forecast_day">${dayName}</h3>
    <p class="weather_forecast_temperature">
      <span class="value">${temperature}</span>
      &deg;C
    </p>
  </article>`
  })
  forecastBlock.innerHTML = forecastItem
}
