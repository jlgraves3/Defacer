var request = require('superagent');

var clientID = process.env.CLIENT_ID,
	clientSecret = process.env.CLIENT_SECRET,
	apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
	xappToken;

//get authentication token
request 
	.post(apiUrl)
	.send({ client_id: clientID, client_secret: clientSecret });
	.end(function(res) {
		xappToken = res.body.token;
	});
