//requiring necessary packages
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const mongo = require('mongodb');

//setting the database connection to varible url
const url = `mongodb+srv://admin:admin@moviequote-kwsqp.mongodb.net/test?retryWrites=true`; //connection string to cloud database 

//setting app to express to be able to use all features
const app =  express();

//set port to applications chosen port
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

app.listen(port, function(){
    console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => res.sendFile(__dirname + "/www/"));

MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log("Connection to Database has been successful");
    db = client.db("soundData");
});

app.post("/addData", (req, res) => {
    db.collection("sound").insertOne(req.body, (err, result) => {
        if (err) throw err;
        console.log("Saved");
        res.redirect("/");
    })
});


app.get("/getData", (req, res) => {
    db.collection("sound").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
});
