var imported = require("./keys");

var twitter = require("twitter");
var spotify = require("spotify");
var request = require('request');

var command = process.argv[2];
var input = process.argv[3];

function spotifyObj(artist, song, link, album){
	this.Artist = artist,
	this.Song = song,
	this.Link = link,
	this.Album = album
}

function myTweets(){}

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

function spotifyThis(song){

	var ace = 0;
	//Default song, if none is entered
	if (!song){
		song = "The Sign",
		ace = 11;
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

function movies(){}

function doThis(){}


switch (command){
	case "my-tweets":
		//show tweets
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
	case "spotifyQ":
		spotifyQuick(input);
		break;
}








	// var queryURL = "https://api.spotify.com/v1/search";

	// $.ajax({
	// 	method: "GET",
	// 	url: queryURL,
	// 	data: {
	// 		type: "track",
	// 		q:song,
	// 		limit: 1
	// 	}
	// }).done(function(response){
	// 	console.log(response)
	// })


    // var queryURL = "https://gateway-a.watsonplatform.net/calls/text/TextGetRankedConcepts";

    // $.ajax({
    //     url: queryURL,
    //     method: 'POST',
    //     data: {
    //         apikey: "4947c53fd9c0d11744fe266fc5b7f3273e5e33ab",
    //         outputMode: "json",
    //         text: inputText
    //     }
    // }).done(function(response){