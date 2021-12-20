//jshint esversion:6
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/secretsDB");
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secrets: [{secret: String}]
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("user", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets"
},
function(accessToken, refreshToken, profile, cb){
  console.log(profile);
  User.findOrCreate({googleId: profile.id }, function(err, user){
    return cb(err, user);
  });
}));

app.route("/")
  .get(function(req, res){
    res.render("home");
  })
;

app.route("/auth/google")
  .get(passport.authenticate("google", {
    scope: ["profile"]
  }))
;

app.route("/auth/google/secrets")
.get(passport.authenticate("google", {failureRedirect: "/login"}),
function(req, res){
  res.redirect("/secrets");
})
;

app.route("/secrets")
  .get(function(req, res){
    User.find({"secrets":{$exists:true}}, function(err, foundUsers){
      if(!err){
        res.render("secrets", {usersWithSecrets: foundUsers});
      }else{
        console.log("An Error occured: " + err);
      }
    })
  })
;

app.route("/submit")
  .get(function(req, res){
    if(req.isAuthenticated()){
      res.render("submit");
    }else{
      res.redirect("/login");
    }
  })
  .post(function(req, res){
    const submittedSecret = {secret: req.body.secret};
    User.findById(req.user.id, function(err, foundUser){
      if(!err){
        if(foundUser){
          foundUser.secrets.push(submittedSecret);
          foundUser.save(function(){
            res.redirect("/secrets");
          })
        }
      }else{
        console.log("An Error occured: " + err);
      }
    })
  })
;

app.route("/logout")
  .get(function(req, res){
    req.logout();
    res.redirect("/");
  })
;

app.route("/login")
  .get(function(req, res){
    res.render("login");
  })
  .post(function(req, res){
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function(err){
      if(!err){
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      })
      }else{
        console.log("An Error occured: " + err);
      }
    })
  })
;

app.route("/register")
  .get(function(req, res){
     res.render("register");
   })
  .post(function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
      if(!err){
        passport.authenticate("local")(req, res, function(){
          res.redirect("/secrets")
        })
      }else{
        console.log("An Error occured: " + err);
        res.redirect("/register");
      }
    })
  })
;

app.listen("3000", function(){
  console.log("Server started on Port 3000");
});
