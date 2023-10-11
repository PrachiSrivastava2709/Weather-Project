const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { resolve } = require("path");
const { rejects } = require("assert");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");   
});

// Promises and Async/ Await
app.post("/", async function(req, res){
    console.log(req);
    var city = req.body.cityName;
    const coordinates = await get_coordinates(city);
    const apiKey = "your_api_key";
    const url2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&appid=" + apiKey;

    https.get(url2, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp - 273.15;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const icon_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temperature in " + city + " is "  + temp + " degrees Celcius</h1>");
            res.write("<p>The weather currently is " + desc + "</p>");
            res.write("<img src=" + icon_url + ">");
        });
    });
});

function get_coordinates(city, callback){
    return new Promise((resolve, reject) => {
        const apiKey = "1784da0607ce16b5a71de7e823741e01";
        const url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
        https.get(url, function(response){
            response.on("data", function(data){
                const coordinates = [];
                const coordinateData = JSON.parse(data);
                coordinates[0] = coordinateData[0].lat;
                coordinates[1] = coordinateData[0].lon;
                resolve(coordinates);
            });
        });
    })
}

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});