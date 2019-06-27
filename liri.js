require('dotenv').config()
var axios = require('axios')
var fs = require('fs')
var keys = require('./keys.js')
var searchQuery = []
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment')
var queryURL = ''

var command = process.argv[2]
var command2 = process.argv[3]
var multiCommand = function () {
    for (i = 3; i < process.argv.length; i++) {
        searchQuery.push(process.argv[i])
        // console.log(searchQuery)
    }
}
multiCommand()

function liriOptions() {

    switch (command) {
        case 'concert-this':

            queryURL = "https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp"
            axios.get(queryURL).then(function (err, data) {
                if (err) {
                    console.log(err)
                }

                console.log('----------Event----------')
                console.log(data.data[0].venue.name)
                console.log(data.data[0].venue.city + ', ' + data.data[0].venue.region)
                var time = moment().format('LL', data.data[0].datetime)
                console.log(time)
            })

            break;

        case 'spotify-this-song':
           
            if (searchQuery === undefined || searchQuery.length == 0){
                searchQuery = ['The', 'Sign', 'Ace', 'Of', 'Base']
            }
            spotify.search({
                type: 'track',
                limit: 5,
                query: searchQuery
            }, function (err, data) {
                if (err) {
                    console.log(err)
                }
                // console.log(data.tracks.items)
                for (i = 0; i < data.tracks.items.length; i++) {
                    console.log('---------------Song---------------')
                    console.log('Title: ' + data.tracks.items[i].name)
                    console.log('Artist: ' + data.tracks.items[i].artists[0].name)
                    console.log('Preview: ' + data.tracks.items[i].preview_url)
                }
            })
            break;

        case 'movie-this':
                if (searchQuery === undefined || searchQuery.length == 0){
                    searchQuery = ['Mr.', 'Nobody']
                }

            queryURL = "https://www.omdbapi.com/?t=" + searchQuery + "&apikey=trilogy";

            axios.get(queryURL).then(function (response) {
                console.log('---------------Movie----------------')
                console.log('Title: ' + response.data.Title)
                console.log('Year: ' + response.data.Year)
                console.log('IMDB Rating: ' + response.data.imdbRating)
                console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value)
                console.log('Country: ' + response.data.Country)
                console.log('Language: ' + response.data.Language)
                console.log('Plot: ' + response.data.Plot)
                console.log('Actors: ' + response.data.Actors)
                console.log('------------------------------------')
            })

            break;

        case 'do-what-it-says':
            fs.readFile('./random.txt', 'utf8', function (err, data) {
                if (err) {
                    console.log(err)
                }
                var randomArray = data.split(',')
                searchQuery = randomArray[1]
                command = randomArray[0]
                liriOptions()
            })


    }
}
liriOptions()