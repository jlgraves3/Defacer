const axios = require('axios');
const moment = require('moment');

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

function renewToken() {
	axios.post(`https://api.artsy.net/api/tokens/xapp_token?client_id=${clientID}&client_secret=${clientSecret}`)
	.then(jsonRes => {
		process.env['TOKEN'] = jsonRes.data.token;
	}).catch(err => console.log(err));
}

module.exports = {
	renewToken: renewToken,
}
