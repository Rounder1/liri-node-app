require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

var Spotify1 = require("node-spotify-api");
var Twitter = require('twitter');
var spotify = new Spotify1(keys.spotify);
var client = new Twitter(keys.twitter);
var inputString = process.argv;

function searchSpotify (mySong) {

    spotify.search({ type: 'track', query: mySong}, function(err, data) { 
        if (err) {
            console.log('Error occurred: ' + err);
            return; 
        }
            console.log(song);
        
            // console.log(JSON.stringify(data.tracks.items[0], null, 2));
            var songInfo = data.tracks.items[0];

            console.log(songInfo.artists[0].name);
            console.log(songInfo.name);
            console.log(songInfo.preview_url);
            console.log(songInfo.album.name);
    });

}


if (inputString[2] === "my-tweets") {    
    
    var params = {screen_name: 'thisisntatest1', count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if(error) {
            console.log(error);
        } else {

            for (var i = 0; i < tweets.length; i++) {
                var tweetNum = 1 + i;
                console.log("------ Tweet #: " + tweetNum + "---------");
                console.log(tweets[i].text);
            }
        }
     });
}


if (inputString[2] === "spotify-this-song") {

     var song = "";

    for (var i = 3; i < inputString.length; i++) {
        song = song + " " + inputString[i];
    } 

    if (song === "") {

        spotify.search({ type: 'track', query: "The Sign"}, function(err, data) { 
            if (err) {
                console.log('Error occurred: ' + err);
                return; 
            }

                var songAce = data.tracks.items[5];

                console.log(songAce.artists[0].name);
                console.log(songAce.name);
                console.log(songAce.preview_url);
                console.log(songAce.album.name);
        });  
        
    } else {

        searchSpotify(song);
  
    }  
}


if (inputString[2] === "movie-this") {

    var movieName = "";

    for (var i = 3; i < inputString.length; i++) {
        movieName = movieName + "+" + inputString[i];
    }

    if (movieName === "") {movieName = "Mr. Nobody";}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {
    if (error) {
        console.log('Error occurred: ' + error);
        return; 
    }

    console.log(JSON.parse(body));
  
});

}



if (inputString[2] === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
    
        data = data.split(",");
        
        searchSpotify(data[1]);

      });
}

   