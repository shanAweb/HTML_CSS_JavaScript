// weather api key
const apiKey = "b61d80441921334bd80f0226217fe71f";
// weather api url
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

var cityName = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

var city1, temp1, hum1, wind1;

// For Today's Weather
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".first").style.display = "none";
    }
    else {
        var data = await response.json();
        city1 =  data.name;
        temp1 = Math.round(data.main.temp);
        hum1 = data.main.humidity;
        wind1 = parseInt(data.wind.speed);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".first").style.display = "block";

        generateWeather();
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityName.value);
})

// generate weather for 10 days
function generateWeather() {
    var daysInput = document.querySelector(".daysInput");
    var weatherContainer = document.querySelector(".For10days");

    weatherContainer.innerHTML = "";
    

    var days = parseInt(daysInput.value);

    if (days < 1 || days > 10) {
        alert("Please enter a valid number between 1 and 10.");
        return;
    }

    for (var i = 0; i < days; i++) {
        var dayName = getDayName(i+1);
        var temperature = getRandomNumber(temp1-2, temp1+2);
        var humidity = getRandomNumber(hum1-2, hum1+2);
        var windSpeed = getRandomNumber(wind1, wind1+3);

        var weatherHTML = `<div class="TenDayForecast">
            <div class="weatherFor10">
                <div>
                    <h1>${dayName}</h1>
                </div>
                <img src="${weatherIcon.src}" class="weather-icon" alt="">
                <h1>${temperature}&deg;C</h1>
                <h2>${city1}</h2>
            </div>
            <div class="MoreDetailsFor10">
                <div class="colFor10">
                    <img src="images/humidity.png" alt="">
                    <div>
                        <p class="humidityFor10">${humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="colFor10">
                    <img src="images/wind.png" alt="">
                    <div>
                        <p class="windFor10">${windSpeed} km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>`;
        weatherContainer.innerHTML += weatherHTML;
    }
}

// function for day name
function getDayName(dayIndex) {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() + dayIndex * 24 * 60 * 60 * 1000);
    return daysOfWeek[futureDate.getDay()];
}

// functon for random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}