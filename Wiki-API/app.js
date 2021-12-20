/////////////////////////////////////////////////// SETUP: required modules ///////////////////////////////////////////////////
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

/////////////////////////////////////////////////// SETUP: app ///////////////////////////////////////////////////
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

/////////////////////////////////////////////////// SETUP: database ///////////////////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/WikiDB");
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
})
const Article = mongoose.model("article", articleSchema);

/////////////////////////////////////////////////// ROUTE: all articles ///////////////////////////////////////////////////
app.route("/articles")
  .get(function(req, res){
    Article.find({}, function(err, foundArticles){
      if(!err){
        res.send(foundArticles);
      }else{
        res.send("An Error occured: " + err);
      }
    })
  })
  .post(function(req, res){
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err){
      if(!err){
        res.send("Successfully added a new article.");
      }else{
        res.send("An Error occured: " + err);
      }
    });
  })
  .delete(function(req, res){
    Article.deleteMany({}, function(err){
      if(!err){
        res.send("Successfully deleted all articles.");
      }else{
        res.send("An Error occured: " + err);
      }
    });
  });

/////////////////////////////////////////////////// ROUTE: specific article ///////////////////////////////////////////////////
app.route("/articles/:articleTitle")
  .get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
      if(!err){
        if(foundArticle){
          res.send(foundArticle);
        }else{
          res.send("No article matching that title was found.")
        }
      }else{
        res.send("An Error occured: " + err);
      }
    });
  })
  .put(function(req, res){
    Article.replaceOne(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      function(err){
      if(!err){
        res.send("Successfully overwritten article.")
      }else{
        res.send("An Error occured: " + err)
      }
    });
  })
  .patch(function(req, res){
    Article.updateOne(
      {title: req.params.articleTitle},
      {$set: req.body},
      function(err){
        if(!err){
          res.send("Successfully updated article.")
        }else{
          res.send("An Error occured: " + err)
        }
      }
    );
  })
  .delete(function(req, res){
    Article.deleteOne({title: req.params.articleTitle}, function(err){
      if(!err){
        res.send("Successfully deleted article.")
      }else{
        res.send("An Error occured: " + err)
      }
    })
  });

/////////////////////////////////////////////////// LISTEN ///////////////////////////////////////////////////
app.listen("3000", function(){
  console.log("Server listening on Port 3000");
});
