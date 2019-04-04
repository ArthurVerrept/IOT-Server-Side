//requiring necessary packages
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const mongo = require('mongodb');

//setting the database connection url variable
const url = `mongodb+srv://admin:admin@moviequote-kwsqp.mongodb.net/test?retryWrites=true`; //connection string to cloud database 

//setting app variable to express to be able to use all features
const app =  express();

//set port to applications chosen port
var port = process.env.PORT || 3000;

//this enables bodyParser which is used to pass the request in the correct formats to database
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

//this is listening for the port, once is is enabled it writes in console the port number
app.listen(port, function(){
    console.log(`app is listening on port ${port}`);
});

//if on the homepage this will bring you thew index.html file from the www folder
app.get("/", (req, res) => res.sendFile(__dirname + "/www/"));

//this connects to the mongo database
MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    //this sets db to be the soundData database
    db = client.db("soundData");
});

//if the url addData is posted to
app.post("/addData", (req, res) => {
    //take the posted data and insert into collection 'sound'
    db.collection("sound").insertOne(req.body, (err, result) => {
        if (err) throw err;
        //once added redirect back to home page
        res.redirect("/");
    })
});

//when the application is loaded it calls /getData from the script in the index file
app.get("/getData", (req, res) => {
    //this gets the collection 'sound' and puts it in an array as 'result'
    db.collection("sound").find().toArray((err, result) => {
        if (err) throw err;
        //this then sends that result array back to the front end
        res.send(result);
    })
});
