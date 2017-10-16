const axios = require('axios');

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const tokenHelper = require('./token_helper');
tokenHelper.renewToken();
var xAppToken = process.env.TOKEN;

var config = {
	headers: {'X-Xapp-Token': process.env.TOKEN}
};

//updates config with new token
function setConfig() {
	config = {
		headers: {'X-Xapp-Token': process.env.TOKEN}
	};
}

function getArtists(req,res,next) {
	setConfig();
	axios.get('https://api.artsy.net/api/artists', config)
	.then(jsonRes => {
		res.locals.data = jsonRes.data
		next();
	}).catch(err => console.log(err));
}

function getArtist(req,res,next) {
	setConfig();
	axios.get(`https://api.artsy.net/api/artists/${req.params.artist}`, config)
	.then(jsonRes => {
		res.locals.data = jsonRes.data
		next();
	}).catch(err => console.log(err));
}

function getArtworks(req,res,next) {
	setConfig();
	axios.get(`https://api.artsy.net/api/artists/${req.params.artist}`, config)
	.then(jsonRes => {
		const artist_id = jsonRes.data.id;
		axios.get(`https://api.artsy.net/api/artworks?artist_id=${artist_id}`, config)
			.then(worksRes => {
				res.locals.data = worksRes.data._embedded.artworks;
				next();
			}).catch(err => console.log(err));
	}).catch(err => console.log(err));
}

module.exports = {
	getArtists: getArtists,
	getArtist: getArtist,
	getArtworks: getArtworks,
}