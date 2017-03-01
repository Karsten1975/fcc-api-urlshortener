var express = require("express");
var validUrl = require("valid-url");
var app = express();

app.set("view engine", "ejs");

//Initial Seed: Url data array to test
var herokuUrl = "http://www.XXXX-XXXX.herokuapp.com/";
var urlData = [
    {
        original_url: "http://spiegel.de",
        short_url: herokuUrl + 0 
    },
    {
       original_url: "http://kicker.de",
        short_url: herokuUrl + 1
    },
    {
        original_url: "http://focus.de",
        short_url: herokuUrl + 2 
    }
    ];

//Index Route for the startpage
app.get("/", function(req, res){
    res.render("index");
});

//Route to redirect to the stort url based on the short url
app.get("/:inputString", function(req, res){
   var inputString = req.params.inputString;
   if (inputString < urlData.length){
    res.redirect(urlData[inputString].original_url);
   } else {
      res.json({error:"This url is not on the database."});
   }
});

//New Route to save entry into url data
app.get("/new/*", function(req, res){
    var inputUrl = req.params[0];
    //Check if URL is valid
    if (validUrl.isUri(inputUrl)){
        //Create new Object for urlData
        var newUrl = {
            original_url: inputUrl,
            short_url: herokuUrl + urlData.length
        };
        urlData.push(newUrl);
        res.json(newUrl);
    } else {
        res.json({error:"Wrong url format, make sure you have a valid protocol and real site."});        
    }
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The url shortener microservices is running...");
});