let weatherAPIKey = '42b6cbf2d98d089461b00b4835dba3b7';

let submitBtnEl = document.getElementById('city-submit');
let cityInputEl = document.getElementById('city-input');
let historyList = document.getElementById('history-display');
console.dir(historyList);
let currentCityEl = document.getElementById('location-display');
let currentTempEl = document.getElementById('temp');
let currentHumidityEl = document.getElementById('humidity');
let currentWindEl = document.getElementById('wind-speed');
let currentIcon = document.getElementById('icon-current');
let forecastIcon1 = document.getElementById('day-1-weather');
let forecastIcon2 = document.getElementById('day-2-weather');
let forecastIcon3 = document.getElementById('day-3-weather');
let forecastIcon4 = document.getElementById('day-4-weather');
let forecastIcon5 = document.getElementById('day-5-weather');
let forecastIconArr = [forecastIcon1, forecastIcon2, forecastIcon3, forecastIcon4, forecastIcon5]
//variables below are declared for the five day forecast

function cityFinder(event) {
    event.preventDefault();
    let city = cityInputEl.value;
    //console.log(city);
    weatherForLocation(city);
}

function showForecast(data2) {
    $('#day-1-date').text(data2.list[5].dt_txt);
    $('#day-1-temperature').text(data2.list[5].main.temp + '°F');
    $('#day-1-humidity').text('Humidity ' + data2.list[5].main.humidity + ' %');
    $('#day-1-wind').text('Wind Speed: ' + data2.list[5].wind.speed + ' mph');

    $('#day-2-date').text(data2.list[13].dt_txt);
    $('#day-2-temperature').text(data2.list[13].main.temp + '°F');
    $('#day-2-humidity').text('Humidity ' + data2.list[13].main.humidity + ' %');
    $('#day-2-wind').text('Wind Speed: ' + data2.list[13].wind.speed + ' mph');

    $('#day-3-date').text(data2.list[21].dt_txt);
    $('#day-3-temperature').text(data2.list[21].main.temp + '°F');
    $('#day-3-humidity').text('Humidity ' + data2.list[21].main.humidity + ' %');
    $('#day-3-wind').text('Wind Speed: ' + data2.list[21].wind.speed + ' mph');

    $('#day-4-date').text(data2.list[29].dt_txt);
    $('#day-4-temperature').text(data2.list[29].main.temp + '°F');
    $('#day-4-humidity').text('Humidity ' + data2.list[29].main.humidity + ' %');
    $('#day-4-wind').text('Wind Speed: ' + data2.list[29].wind.speed + ' mph');

    $('#day-5-date').text(data2.list[37].dt_txt);
    $('#day-5-temperature').text(data2.list[37].main.temp + '°F');
    $('#day-5-weather').text
    $('#day-5-humidity').text('Humidity ' + data2.list[37].main.humidity + ' %');
    $('#day-5-wind').text('Wind Speed: ' + data2.list[37].wind.speed + ' mph');


    for (let i = 0; i < forecastIconArr.length; i++) {
        while (forecastIconArr[i].firstChild) {
            forecastIconArr[i].removeChild(forecastIconArr[i].firstChild);
        }
        let img = document.createElement('img');
        if (forecastIconArr[i] === forecastIcon1) {
        img.src = 'http://openweathermap.org/img/wn/'+ data2.list[5].weather[0].icon +'@2x.png'
        } else if (forecastIconArr[i] === forecastIcon2) {
            img.src = 'http://openweathermap.org/img/wn/'+ data2.list[13].weather[0].icon +'@2x.png'
        } else if (forecastIconArr[i] === forecastIcon3) {
            img.src = 'http://openweathermap.org/img/wn/'+ data2.list[21].weather[0].icon +'@2x.png'
        } else if (forecastIconArr[i] === forecastIcon4) {
            img.src = 'http://openweathermap.org/img/wn/'+ data2.list[29].weather[0].icon +'@2x.png'
        } else if (forecastIconArr[i] === forecastIcon5) {
            img.src = 'http://openweathermap.org/img/wn/'+ data2.list[37].weather[0].icon +'@2x.png'
        }
        forecastIconArr[i].appendChild(img);

       
    }


}
//The function below will call the function to display the five-day forecast for the selected area.
function getForecast(lat,lon) {
    let forecastFetch = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=' + weatherAPIKey;
    fetch(forecastFetch)
    .then(function (response) {
     return response.json();
   })
   .then(function (data2) {
     console.log(data2);
     showForecast(data2);
   });

}

//The function below will provide the weather for the selected button in the history section.
function historyWeather (event) {
    event.preventDefault();
    let city = event.target.textContent;
    weatherForLocation(city);
}

function weatherForLocation(city) {
    let cityFetch = 'https://api.openweathermap.org/data/2.5/weather?appid='+weatherAPIKey+'&q='+city+'&units=imperial'
    //console.log(cityFetch);
    fetch(cityFetch)
    .then(function (response) {
       return response.json();
     })
     .then(function (data) {
       //console.log(data);
       displayWeatherForLocation (data);
       var {lat, lon} = data.coord;
       getForecast(lat,lon);
     });

}

//the function below displays the current weather data on the main section of the page.
function displayWeatherForLocation (data) {
    while (currentIcon.firstChild) {
        currentIcon.removeChild(currentIcon.firstChild);
    }
    let img = document.createElement('img');
    console.log(data);
    img.src = 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png';
    currentIcon.appendChild(img);
    currentCityEl.textContent = 'CITY: '+ data.name +' (today)';
    currentTempEl.textContent = 'Temperature: ' + data.main.temp + ' ℉';
    currentHumidityEl.textContent = 'Humidity: ' + data.main.humidity + '%';
    currentWindEl.textContent = 'Wind Speed: ' + data.wind.speed + " MPH";

}

//The function below will remove all child nodes before rendering the updated history.
function removeChildNodes() {
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }
}
//The function below will display the search history as button elements on the page.
function renderHistoryButtons() {
    let historyArr = localStorage.getItem('history');
    historyArr = JSON.parse(historyArr);
    historyArr.reverse();
    removeChildNodes();
    for (let i = 0; i < historyArr.length; i++) {
        let historyItem = document.createElement('button');
        historyItem.textContent = historyArr[i];
        historyList.appendChild(historyItem);  
    }

    
}
// The function below will eventually be used to set localStorage.   
function setLocalStorage (event) {
    let cityName = cityInputEl.value
    event.preventDefault();
    let historyArr = localStorage.getItem('history');
    console.log(historyArr);
    if(historyArr === null) {
        historyArr = [];
        historyArr.push(cityName);
        localStorage.setItem('history', JSON.stringify(historyArr));
    } else {
        historyArr = JSON.parse(historyArr);
        historyArr.push(cityName);
        localStorage.setItem('history', JSON.stringify(historyArr));
    }
    renderHistoryButtons();
}

renderHistoryButtons();

submitBtnEl.addEventListener('click', cityFinder);
historyList.addEventListener('click', historyWeather);
submitBtnEl.addEventListener('click', setLocalStorage);