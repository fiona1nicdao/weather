/*
*/
var inputField = document.querySelector("#cityname")
var btnSearchEl = document.querySelector(".btnSearch")
var btnAusEl =document.querySelector(".btnAus")
var btnChiEl =document.querySelector(".btnChi")
var btnNewEl =document.querySelector(".btnNew")
var btnOrlEl =document.querySelector(".btnOrl")
var btnSanEl =document.querySelector(".btnSan")
var btnSeaEl =document.querySelector(".btnSea")
var btnDenEl =document.querySelector(".btnDen")
var btnAtlEl =document.querySelector(".btnAtl")
var requestUrl
var cityName
// Button &function for type in "search for a city"
btnSearchEl.addEventListener("click",searchTextbox);
function searchTextbox(event) {
    event.preventDefault()
    console.log(cityName)
    cityName = inputField.value
    fetchData()
}
// austin button
btnAusEl.addEventListener("click", austin)
function austin() {
    // location.reload()
    console.log(cityName)
    cityName = 'Austin'
    fetchData()   
}
// chicago button
btnChiEl.addEventListener("click", chicago)
function chicago() {
    console.log(cityName)
    cityName = 'Chicago'
    fetchData()   
}
// new york button
btnNewEl.addEventListener("click", newyork)
function newyork() {
    console.log(cityName)
    cityName = 'New York'
    fetchData()   
}
// orlando button
btnOrlEl.addEventListener("click", orlando)
function orlando() {
    console.log(cityName)
    cityName = 'Orlando'
    fetchData()   
}
// san francisco button
btnSanEl.addEventListener("click", sanfrancisco)
function sanfrancisco() {
    console.log(cityName)
    cityName = 'San Francisco'
    fetchData()   
}
// seallte button
btnSeaEl.addEventListener("click", seattle)
function seattle() {
    console.log(cityName)
    cityName = 'Seattle'
    fetchData()   
}

btnDenEl.addEventListener("click", denver)
function denver() {
    console.log(cityName)
    cityName = 'Denver'
    fetchData()   
}
btnAtlEl.addEventListener("click", atlanta)
function atlanta() {
    console.log(cityName)
    cityName = 'Atlanta'
    fetchData()   
}
// fetch data 
function fetchData() {
    var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
    requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial' + '&appid=' + apiKey

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
        var mainCity =document.body.children[1].children[1].children[0] 
        // var mainCity =document.getElementById(".city")
        mainCity.append(nameCity)

        // weather icon
        var weatherIcon = document.createElement('img')
        weatherIcon.src= 'http://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png'
        mainCity.appendChild(weatherIcon)

        // temp
        var tempCity = document.createElement('p')
        tempCity.textContent = "Temperature: " + weatherData.main.temp + '\xB0'
        mainCity.appendChild(tempCity)

        // wind speed
        var windCity = document.createElement('p')
        windCity.textContent = "Wind Speed: " + weatherData.wind.speed +" MPH" 
        mainCity.appendChild(windCity)

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
            var uv = uvData.current.uvi
            uvEl.textContent = "UV: " + uv
            mainCity.appendChild(uvEl)
            uvEl.classList.add("uvStyle")
            var uvSyleEl = document.querySelector(".uvStyle")
            console.log(typeof uv)
            if (uv <= 2.99) {
                uvSyleEl.setAttribute("style", "padding: 20px; background-color: green")
            } else if (uv >= 3 && uv <= 7.99) {
                uvSyleEl.setAttribute("style", "padding:20px; background-color: yellow")
            } else if (uv >= 8) {
                uvSyleEl.setAttribute("style", "padding: 20px; background-color: red")
            }

            //5-day forecast
            // date
            for (var i=0; i <5; i++){
                var day = document.createElement('p')
                var unix = uvData.daily[i+1].dt
                var date = new Date(unix*1000)
                var date0 = date.toLocaleDateString("en-US")
                day.textContent = date0
                document.body.children[1].children[1].children[1].children[1].children[i].appendChild(day)
            }
            // 1 icon
            for (var i=0; i<5;i++) {
                var icon = document.createElement('img')
                icon.src = 'http://openweathermap.org/img/wn/' + uvData.daily[i+1].weather[0].icon +'@2x.png'
                document.body.children[1].children[1].children[1].children[1].children[i].appendChild(icon)
            }
            // 1 temp
            for (var i=0;i<5;i++) {
                var temp = document.createElement('p')
                temp.textContent = "temp: " + uvData.daily[i+1].temp.day + '\xB0'
                document.body.children[1].children[1].children[1].children[1].children[i].appendChild(temp)
            }
            // 1 wind
            for (var i=0;i<5;i++) {
                var wind = document.createElement('p')
                wind.textContent = "wind: "+ uvData.daily[i+1].wind_speed + " MPH"
                document.body.children[1].children[1].children[1].children[1].children[i].appendChild(wind)
            }
            // 1 humidity 
            for (var i=0;i<5;i++) {
                var humidity = document.createElement('p')
                humidity.textContent= "humidity: "+ uvData.daily[i+1].humidity +"%"
                document.body.children[1].children[1].children[1].children[1].children[i].appendChild(humidity)
            }
        })

    })
}


// place data into the webpage 
var timeEl = document.querySelector(".time")
function getTime() {
    var time = moment().format("MM/DD/YYYY");
    timeEl.innerHTML= time
    console.log(time)
}
getTime()