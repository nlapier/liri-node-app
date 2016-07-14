var imported = require("./keys");

var twitter = require("twitter");
var twitterFunc = new twitter(imported.twitterKeys);
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

var command = process.argv[2];
var input = process.argv[3];

//=====LIRI Functions======
function printObj(obj){
	for (key in obj){
		console.log(key + ": " + obj[key])
	}
}

function liriActivate(){
	switch (command){
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThis(input);
			break;
		case "movie-this":
			movies(input)
			break;
		case "do-what-it-says":
			doThis();
			break;
	}
}
//=====LIRI Functions======

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

		printObj(songObj);
	})
}
//=====Spotify======

//=====Twitter======
function myTweets(){
	//Grabs my twitter feed, up to 20 tweets
	twitterFunc.get("search/tweets", {q: "natlapier", limit: 20}, function(error, tweets, response){
		//Loops through all returned tweets, and prints the Tweet's text and time sent
		var tw = tweets.statuses
		var tweetObj = new Object();
		for(var i = 0; i < tw.length; i++){
				var key = tw[i].created_at;
				var text = "'" + tw[i].text + "'";
				tweetObj[key] = text;
		}

		printObj(tweetObj);
	})
}
//=====Twitter======

//=====OBDM======
function movieObj(title, year, rating, country, language, actors, tomatoMeter, rtURL, plot){
	this.Title = title,
	this.Year = year,
	this.Rating = rating,
	this.Country = country,
	this.Language = language,
	this.Actors = actors,
	this.Tomatometer = tomatoMeter,
	this.RT = rtURL,
	this.Plot = plot
}

function movies(input){
	var queryURL = "http://www.omdbapi.com/?t=";
	request(queryURL + input, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		var movie = JSON.parse(body);
    		var newFilm = new movieObj(movie.Title, movie.Year, movie.Rated, movie.Country, movie.Language, movie.Actors, movie.imdbRating, "RT", movie.Plot);
    		printObj(newFilm);
    	}
	})
}
//=====OBDM======

//=====Do-what-it-says======
function doThis(){
	fs.readFile("./random.txt", "utf8", function(error, data){
		if(!error){
			var comma = data.indexOf(",");
			command = data.slice(0, comma);
			input = data.slice(comma+1);
			liriActivate()
		}
	})
}
//=====Do-what-it-says======

liriActivate()




/*Storage
var comma = data.indexOf(",");
console.log(comma);

function doThis(){
	fs.readfile("./random.txt", function(error, data){
		if(!error){
			liriActivate()
		}
	})
	
}



switch (command){
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifyThis(input);
		break;
	case "movie-this":
		movies(input)
		break;
	case "do-what-it-says":
		doThis();
		break;
}

function liriActivate(liriCommand, liriInput){
	switch (liriCommand){
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifyThis(liriInput);
		break;
	case "movie-this":
		movies(liriInput)
		break;
	case "do-what-it-says":
		//;
		break;
	}
}

liriActivate(command, input);

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


	