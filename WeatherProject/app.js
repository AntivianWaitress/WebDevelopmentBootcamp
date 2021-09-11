const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "ad83fdcfc983edd2932ccc55cdbf3556";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1> Die Temperatur in " + query +" ist " + temp + " Grad Celsius. </h1>");
      res.write("<p>Das Wetter ist derzeit " + description + ".</p>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
