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
var btnClear =document.querySelector(".btnClear")
var requestUrl
var cityName
// refresh page
btnClear.addEventListener("click", function(){
    location.reload()
})
// Button &function for type in "search for a city"
btnSearchEl.addEventListener("click",searchTextbox);
function searchTextbox(event) {
    event.preventDefault()
    cityName = inputField.value
    console.log(cityName)
    fetchData() 
}
// austin button
btnAusEl.addEventListener("click", austin)
function austin() {
    // location.reload()
    cityName = 'Austin' 
    console.log(cityName)
    fetchData()   
}
// chicago button
btnChiEl.addEventListener("click", chicago)
function chicago() {
    cityName = 'Chicago'
    console.log(cityName)
    fetchData()   
}
// new york button
btnNewEl.addEventListener("click", newyork)
function newyork() {
    cityName = 'New York'
    console.log(cityName)
    fetchData()   
}
// orlando button
btnOrlEl.addEventListener("click", orlando)
function orlando() {
    cityName = 'Orlando'
    console.log(cityName)
    fetchData()   
}
// san francisco button
btnSanEl.addEventListener("click", sanfrancisco)
function sanfrancisco() {
    cityName = 'San Francisco'
    console.log(cityName)
    fetchData()   
}
// seattle button
btnSeaEl.addEventListener("click", seattle)
function seattle() {
    cityName = 'Seattle'
    console.log(cityName)
    fetchData()   
}
// denver button
btnDenEl.addEventListener("click", denver)
function denver() {
    cityName = 'Denver'
    console.log(cityName)
    fetchData()  
}
// atlanta button
btnAtlEl.addEventListener("click", atlanta)
function atlanta() {
    cityName = 'Atlanta'
    console.log(cityName)
    fetchData()   
}
// fetch data 
function fetchData() {
    document.getElementById('mainsection').classList.remove("mainpart")

    document.getElementById("city").remove()
    var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
    requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial' + '&appid=' + apiKey

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(weatherData){
        console.log(weatherData)
        var lat = weatherData.coord.lat
        console.log("lat",lat)
        localStorage.setItem("lat",JSON.stringify(lat))

        var lon = weatherData.coord.lon
        localStorage.setItem("lon",JSON.stringify(lon))
        console.log("lon",lon)

        // city name
        var nameCity = document.createElement('h2')
        nameCity.textContent = weatherData.name
        var mainCity =document.body.children[1].children[1].children[0].children[0]
        mainCity.append(nameCity)
        nameCity.classList.add("line")

        // get Date
        var time = moment().format("MMM Do YYYY");
        var timeEl =document.createElement('h2')
        timeEl.textContent = time
        mainCity.append(timeEl)
        timeEl.classList.add("line")
        console.log(time)

        // weather icon
        var weatherIcon = document.createElement('img')
        weatherIcon.src= 'https://openweathermap.org/img/wn/'+weatherData.weather[0].icon+'@2x.png'
        var mainCity2 =document.body.children[1].children[1].children[0] 
        mainCity2.appendChild(weatherIcon)
        weatherIcon.classList.add("iconStyle")

        // temp
        var tempCity = document.createElement('p')
        tempCity.textContent = "Temperature: " + weatherData.main.temp + '\xB0'
        
        mainCity2.appendChild(tempCity)

        // wind speed
        var windCity = document.createElement('p')
        windCity.textContent = "Wind Speed: " + weatherData.wind.speed +" MPH" 
        mainCity2.appendChild(windCity)

        // Humidity
        var humidity = document.createElement('p')
        humidity.textContent = "Humidity: " + weatherData.main.humidity +"%"
        mainCity2.appendChild(humidity)

        moreFetch()
    })
}

function moreFetch() {
    // UV index
    var lat2 = JSON.parse(localStorage.getItem("lat"))
    console.log("lat2",lat2)
    var lon2 = JSON.parse(localStorage.getItem("lon"))
    console.log("lon2",lon2)
    var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
    var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat2 +"&lon="+lon2 +"&exclude=hourly&units=imperial&appid=" +apiKey
    console.log(uvURL)
    fetch(uvURL)
    .then(function(response){
        return response.json();
    })
    .then(function(uvData){
        console.log(uvData)
        var uvEl = document.createElement('p')
        var uv = uvData.current.uvi
        uvEl.textContent = "UV Index: " + uv
        var mainCity =document.body.children[1].children[1].children[0]
        mainCity.appendChild(uvEl)
        uvEl.classList.add("uvStyle")
        var uvSyleEl = document.querySelector(".uvStyle")
        console.log(typeof uv)
        if (uv <= 2.99) {
            uvSyleEl.setAttribute("style", "background-color: #008000")
        } else if (uv >= 3 && uv <= 7.99) {
            uvSyleEl.setAttribute("style", "background-color: #cccc0a")
        } else if (uv >= 8) {
            uvSyleEl.setAttribute("style", "background-color: #ff0000")
        }

        //5-day forecast
        // date
        var card = document.body.children[1].children[1].children[1].children[1].children[i]
        for (var i=0; i <5; i++){
            var day = document.createElement('h5')
            var unix = uvData.daily[i+1].dt
            var date = new Date(unix*1000)
            var date0 = date.toLocaleDateString("en-US")
            day.textContent = date0
            var card = document.body.children[1].children[1].children[1].children[1].children[i]
            card.appendChild(day)
        }
        // icon
        for (var i=0; i<5;i++) {
            var icon = document.createElement('img')
            icon.src = 'https://openweathermap.org/img/wn/' + uvData.daily[i+1].weather[0].icon +'@2x.png'
            document.body.children[1].children[1].children[1].children[1].children[i].appendChild(icon)
            icon.classList.add("iconStyle")
        }
        // temp
        for (var i=0;i<5;i++) {
            var temp = document.createElement('p')
            temp.textContent = "Temp: " + uvData.daily[i+1].temp.day + '\xB0'
            document.body.children[1].children[1].children[1].children[1].children[i].appendChild(temp)
        }
        // wind
        for (var i=0;i<5;i++) {
            var wind = document.createElement('p')
            wind.textContent = "Wind: "+ uvData.daily[i+1].wind_speed + " MPH"
            document.body.children[1].children[1].children[1].children[1].children[i].appendChild(wind)
        }
        // humidity 
        for (var i=0;i<5;i++) {
            var humidity = document.createElement('p')
            humidity.textContent= "Humidity: "+ uvData.daily[i+1].humidity +"%"
            document.body.children[1].children[1].children[1].children[1].children[i].appendChild(humidity)
        }
    })
}