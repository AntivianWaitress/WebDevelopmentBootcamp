
//jshint esversion:6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Please check your data, no name given."]},
  score: {
            type: Number,
            min: 1,
            max: 10},
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
  });

  const Person = mongoose.model("Person", personSchema);

  const strawberry = new Fruit({
    name: "Strawberry",
    score: 10,
    review: "The best."
  });

  strawberry.save();

  Person.updateOne({name: "John"}, {favoriteFruit: strawberry}, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully changed.");
    }
  })

  // const person = new Person({
  //   name: "Amy",
  //   age: 12,
  //   favoriteFruit: pineapple
  // });
  //
  // person.save();

  // Fruit.find(function(err, fruits){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     mongoose.connection.close();
  //
  //     fruits.forEach(function(fruit){
  //       console.log(fruit.name);
  //     });
  //   }
  // });

const findDocuments = function(db, callback){
  const collection = db.collection("fruits");
  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("Found following records:");
    console.log(fruits);
    callback(fruits);
  })
}
