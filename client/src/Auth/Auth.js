//from: https://auth0.com/docs/quickstart/spa/react/01-login
import auth0 from 'auth0.js';

export default class Auth {
	auth0 = new auth0.webAuth({
		domain: 'vandalizer.auth0.com',
		clientID: '3OnFgprDNPh7Y-UAO0xhe2g2MDSM3Zje',
		redirectUri: 'http://localhost:3000/callback',
		audience: 'https://vandalizer.auth0.com/userinfo',
		responseType: 'token id_token',
		scope: 'openid'
	});

	login() {
		this.auth0.authorize();
	}
}