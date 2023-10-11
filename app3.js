// Using Fetch API
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");   
});

const apiKey = "your_api_key";
app.post("/", async function(req, res){
    var city = req.body.cityName;
    const coordinates = await get_coordinates(city);

}); 

function get_coordinates(city){
    fetch( "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey)

}