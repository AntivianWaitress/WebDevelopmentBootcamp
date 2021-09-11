//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact Me at: email@email.com");
});

app.get("/about", function(req, res){
  res.send("Hello, my name is Kira Kowalski and I am a junior web developer.");
});

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Coding</li><li>Videogames</li><li>Reading</li></ul>");
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
