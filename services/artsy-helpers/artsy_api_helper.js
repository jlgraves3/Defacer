const request = require('superagent');
const axios = require('axios');

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
xappToken = process.env.TOKEN;

const config = {
	headers: {'X-Xapp-Token': xappToken}
};

function getArtists(req,res,next) {
	axios.get('https://api.artsy.net/api/artists/', config)
	.then(jsonRes => {
		console.log(jsonRes);
		res.locals.data = jsonRes.data
		next()
	}).catch(err => console.log(err));
}

module.exports = {
	getArtists: getArtists
}