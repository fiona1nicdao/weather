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
        var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+lon +"&exclude=hourly&units=imperial&appid=" +apiKey
        console.log(uvURL)
        fetch(uvURL)
        .then(function(response){
            return response.json();
        })
        .then(function(uvData){
            console.log(uvData, weatherData)
            var uvEl = document.createElement('p')
            uvEl.textContent = "UV: " + uvData.current.uvi
            mainCity.appendChild(uvEl)

            //5-day forecast
            // day 1
            // date
            var day01 = document.createElement('h3') 
            var unix01 = uvData.daily[1].dt
            // var date01 = new Date(unix01*1000)
            day01.textContent = unix01
            console.log(uvData.daily[1].dt)
            var card01 = document.getElementById("day1")
            card01.appendChild(day01)
            // 1 icon
            var day1Icon = document.createElement('img')
            day1Icon.src ='http://openweathermap.org/img/wn/' + uvData.daily[1]
            // 1 temp
            // 1 wind
            // 1 humidity 

            // for loog for other cards ??? try it out 
            var day02 = document.createElement('h3') 
            var unix02 = uvData.daily[2].dt
            day02.textContent = unix02
            console.log(uvData.daily[2].dt)
            var card02 = document.getElementById("day2")
            card02.appendChild(day02)

            var day03 = document.createElement('h3') 
            var unix03 = uvData.daily[3].dt
            day03.textContent = unix03
            console.log(uvData.daily[3].dt)
            var card03 = document.getElementById("day3")
            card03.appendChild(day03)

            var day04 = document.createElement('h3') 
            var unix04 = uvData.daily[4].dt
            day04.textContent = unix04
            console.log(uvData.daily[4].dt)
            var card04 = document.getElementById("day4")
            card04.appendChild(day04)

            var day05 = document.createElement('h3') 
            var unix05 = uvData.daily[5].dt
            day05.textContent = unix05
            console.log(uvData.daily[5].dt)
            var card05 = document.getElementById("day5")
            card05.appendChild(day05)


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

// btnSearchEl.addEventListener("click", get5dayData)
// function get5dayData() {
//     var cityName = inputField.value
//     console.log(cityName)
//     var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
//     var fiveDayURL ='https://api.openweathermap.org/data/2.5/forecast/daily?q=' + cityName + '&units=imperial&cnt=7&appid=' + apiKey
//     console.log(fiveDayURL)
//     fetch('https://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid=b1d3856bac61869cb925c991abf62e2c')
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(fiveDayData){
//         console.log(fiveDayData)
//     })

// }
