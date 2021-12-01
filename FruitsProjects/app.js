//jshint esversion:6

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "fruitsDB";

const client = new MongoClient(url, {useNewUrlParser: true});

client.connect(function(err){
  assert.equal(null, err);
  console.log("Connected successfully to the server");

  const db = client.db(dbName);

  findDocuments(db, function(){
    client.close();
  });
});

const insertDocuments = function(db, callback){
  const collection = db.collection("fruits");
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
    name: "Banana",
    score: 9,
    review: "Great stuff!"
  }
], function(err, result){
    assert.equal(err, null);
    console.log("Inserted 3 Documents into the collection");
    callback(result);
    })
}

const findDocuments = function(db, callback){
  const collection = db.collection("fruits");
  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("Found following records:");
    console.log(fruits);
    callback(fruits);
  })
}
