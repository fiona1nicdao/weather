/*
add in API 

*/
var inputField = document.querySelector("#cityname")
var btnSearchEl = document.querySelector(".btnSearch")

console.log("hello")

function fetchData() {
    console.log(inputField.value)
    var cityName = inputField.value
    var apiKey = 'b1d3856bac61869cb925c991abf62e2c'
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
    console.log(requestUrl)

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(weatherData){
            console.log(weatherData)
        })
}
// btnSearchEl.addEventListener("click", food)

function food(event) {
    event.preventDefault()
    console.log(inputField.value)
}