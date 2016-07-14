var imported = require("./keys");

var twitter = require("twitter");
var twitterFunc = new twitter(imported.twitterKeys);
var spotify = require("spotify");
var request = require('request');

var command = process.argv[2];
var input = process.argv[3];

//=====Spotify======
function spotifyObj(artist, song, link, album){
	this.Artist = artist,
	this.Song = song,
	this.Link = link,
	this.Album = album
}

function spotifyThis(song){

	var ace = 0;

	//Default song, if none is entered
	if (!song){
		song = "The Sign",
		ace = 7;
	};

	spotify.search({ 
		type: 'track', 
		query: song}, 
	function(err, data) {
	    if (err){
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    //Grab only the first result
	    var result = data.tracks.items[ace];

	    //Grabs all artists 
		var artist = [];
		for (var i = 0; i < result.artists.length; i++){
			artist.push(result.artists[i].name);
		}
		artist = artist.join(", ");

		//Grabs song, link and album info
		var song = result.name;
		var link = result.preview_url;
		var album = result.album.name;

		//Stores everything in a new object, to be added to  log.txt
		var songObj = new spotifyObj(artist, song, link, album);

		for (key in songObj){
			console.log(key + ": " + songObj[key])
		}
	})
}

//=====Spotify======

//=====Twitter======
function myTweets(){
	twitterFunc.get("search/tweets", {q: "natlapier"}, function(error, tweets, response){
		var tw = tweets.statuses
		for(var i = 0; i < tw.length; i++){
			var output = tw[i].created_at;
			output += ": '";
			output += tw[i].text;
			output += "'"
			console.log(output);
		}
	})
}

function movies(){}

function doThis(){}

switch (command){
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifyThis(input);
		break;
	case "movie-this":
		//;
		break;
	case "do-what-it-says":
		//;
		break;
	// case "spotifyQ":
	// 	spotifyQuick(input);
	// 	break;
}





/*Storage
------Spotify
var queryURL = "https://api.spotify.com/v1/search";

$.ajax({
	method: "GET",
	url: queryURL,
	data: {
		type: "track",
		q:song,
		limit: 1
	}
}).done(function(response){
	console.log(response)
})

var queryURL = "https://gateway-a.watsonplatform.net/calls/text/TextGetRankedConcepts";

$.ajax({
    url: queryURL,
    method: 'POST',
    data: {
        apikey: "4947c53fd9c0d11744fe266fc5b7f3273e5e33ab",
        outputMode: "json",
        text: inputText
    }
}).done(function(response){}

function spotifyQuick(song){
	spotify.search({ 
		type: 'track', 
		query: song}, 
	function(err, data) {
	    if (err){
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    console.log(JSON.stringify(data, null, 2))
	})
}
---------

-----Twitter
var path = "https://api.twitter.com/1.1/statuses/user_timeline.json";
var params = {
	screen_name: "natlapier";
	count: 20;
}
var callback
var twitterURL = "https://api.twitter.com/1.1/search/tweets.json?q=%40natlapier&src=typd";

*/


	