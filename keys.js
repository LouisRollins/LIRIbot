// spotify client id= dcf9790c52754af6905a69ce08faf2c3
// spotify client secret = 954e3bc335d64f45b7f800d7e1a7f31b

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
