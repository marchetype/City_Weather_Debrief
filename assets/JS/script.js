let weatherAPIKey = '42b6cbf2d98d089461b00b4835dba3b7';

let submitBtnEl = document.getElementById('city-submit');
let cityInputEl = document.getElementById('city-input');
let historyList = document.getElementById('history-display');
let currentCityEl = document.getElementById('location-display');
let currentTempEl = document.getElementById('temp');
let currentHumidityEl = document.getElementById('humidity');
let currentWindEl = document.getElementById('wind-speed')

function cityFinder(event) {
    event.preventDefault();
    let city = cityInputEl.value;
    console.log(city);
    weatherForLocation(city);
}

function weatherForLocation(city) {
    let cityFetch = 'https://api.openweathermap.org/data/2.5/weather?appid='+weatherAPIKey+'&q='+city+'&units=imperial'
    console.log(cityFetch);
    fetch(cityFetch)
    .then(function (response) {
       return response.json();
     })
     .then(function (data) {
       console.log(data);
       displayWeatherForLocation (data);
       var {lat, lon} = data.coord;
       getForecast(lat,lon);
     });

}

function displayWeatherForLocation (data) {
    currentCityEl.textContent = 'CITY: '+ data.name + ;
    currentTempEl.textContent = 'Temperature: ' + data.main.temp + ' ℉';
    currentHumidityEl.textContent = 'Humidity: ' + data.main.humidity + '%';
    currentWindEl.textContent = 'Wind Speed: ' + data.wind.speed + " MPH";
}

submitBtnEl.addEventListener('click', cityFinder);

// The commented-out function below will eventually be used to call from localStorage.   
// submitBtnEl.addEventListener('click', function(event) {
//     event.preventDefault();
    // let historyItem = document.createElement('button');
    // localStorage.setItem
    // historyItem.textContent = cityInputEl.value;
    // historyList.appendChild(historyItem);
//     let historyArr = [];
//     for (let i = 0; i < historyArr.length; i++) {
//         
//     }
    

//     console.log(historyItem);
// })
