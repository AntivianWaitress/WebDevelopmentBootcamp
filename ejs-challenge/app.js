//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true},
  text: String,
});

const Post = mongoose.model("post", postSchema);

const contentSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true},
  content: String
});

const Content = mongoose.model("content", contentSchema);

const homeStartingContent = "test";
const aboutContent = "test";
const contactContent = "test";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  Post.find({}, function(err, foundPosts){
    if(!err){
      Content.findOne({route: "home"}, function(err, foundContent){
        if(!err){
          res.render("home", {content: foundContent.content, posts: foundPosts});
        }
      })
    }
  });
});

app.get("/contact", function(req, res){
  Content.findOne({route: "contact"}, function(err, foundContent){
    res.render("contact", {content: foundContent.content});
  })
});

app.get("/about", function(req, res){
  Content.findOne({route: "about"}, function(err, foundContent){
    res.render("about", {content: foundContent.content});
  })
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:postId", function(req, res){
  Post.findOne({_id: req.params.postId}, function(err, foundPost){
    if(!err){
      if(!foundPost){
        res.redirect("/")
      }else{
        res.render("post", {
          title: foundPost.title,
          text: foundPost.text
        });
      }
    };
  });
});

app.post("/compose", function(req, res){
  let newPost = new Post({
    title: req.body.inputTitle,
    text: req.body.inputPost,
  })
  newPost.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
