/*
add in API 

*/
var inputField = document.querySelector("#cityname")
var btnSearchEl = document.querySelector(".btnSearch")

// Button &function for type in "search for a city"
btnSearchEl.addEventListener("click",fetchData)

function fetchData(event) {
    event.preventDefault()
    console.log(inputField.value)
    var cityName = inputField.value
    var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial' + '&appid=' + apiKey
    console.log(requestUrl)

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(weatherData){
        console.log(weatherData)
        console.log(weatherData.name)

        // city name
        var nameCity = document.createElement('h2')
        nameCity.textContent = weatherData.name
        console.log(nameCity)
        var mainCity =document.body.children[1].children[1].children[0] 
        // var mainCity =document.getElementById(".city")
        mainCity.append(nameCity)

        // weather icon
        var weatherIcon = document.createElement('img')
        weatherIcon.src= 'http://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png'
        mainCity.appendChild(weatherIcon)

        // temp
        var tempCity = document.createElement('p')
        tempCity.textContent = "Temperature: " + weatherData.main.temp
        mainCity.appendChild(tempCity)

        // Humidity
        var humidity = document.createElement('p')
        humidity.textContent = "Humidity: " + weatherData.main.humidity +"%"
        mainCity.appendChild(humidity)

        // UV index
        var lat = weatherData.coord.lat
        console.log(lat)
        var lon = weatherData.coord.lon
        console.log(lon)
        var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+lon +"&exclude=hourly&appid=" +apiKey
        console.log(uvURL)
        fetch(uvURL)
        .then(function(response){
            return response.json();
        })
        .then(function(uvData){
            console.log(uvData)
            var uvEl = document.createElement('p')
            uvEl.textContent = "UV: " + uvData.current.uvi
            mainCity.appendChild(uvEl)

            //5-day forecast
            var day01 = document.createElement('h3') 
        })

    })
}


// place data into the webpage 
function getTime() {
    var timeEl = document.querySelector(".time")
    timeEl.textContent= moment().format("MM/DD/YYYY");
}
getTime()

// Button & function for austin 

// 5-Day Forecast/ date/ icon/ temp/ wind/ humidity 
// need to use 

btnSearchEl.addEventListener("click", get5dayData)
function get5dayData() {
    var cityName = inputField.value
    console.log(cityName)
    var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
    var fiveDayURL ='https://api.openweathermap.org/data/2.5/forecast/daily?q=' + cityName + '&units=imperial&cnt=7&appid=' + apiKey
    console.log(fiveDayURL)
    fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid=b1d3856bac61869cb925c991abf62e2c')
    .then(function(response){
        return response.json();
    })
    .then(function(fiveDayData){
        console.log(fiveDayData)
    })

}
