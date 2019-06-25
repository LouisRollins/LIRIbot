require('dotenv').config()

var keys = require('./keys.js')

var searchQuery = []
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2]
var command2 = process.argv[3]
var multiCommand = function(){
    for (i=3; i<process.argv.length; i++){
        searchQuery.push(process.argv[i])
        console.log(searchQuery)
    }
}
multiCommand()

switch (command) {
    case 'concert-this':

        break;

    case 'spotify-this-song':

        spotify.search({
            type: 'track',
            limit: 5,
            query: searchQuery
        }, function(err, data){
            if (err){
                console.log(err)
            }
            // console.log(data.tracks.items)
            for (i=0; i < data.tracks.items.length; i++){
                console.log(data.tracks.items[i].name)
                var artist = data.tracks.items.artists
                console.log(Object.keys(artist)[3])
            }
        })
        break;

    case 'movie-this':

        break;

    case 'do-what-it-says':

        break;
}