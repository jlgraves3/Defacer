const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

//register - create new user
authRouter.post('/register', usersController.create);

//login
authRouter.post('/login', passport.authenticate('local', {
	succesRedirect: '/auth/success',
	failureRedirect: '/auth/failure',
	failureFlash: true,
}));

authRouter.get('/success',(req,res) => {
	res.json({
		auth: true,
		message: 'login successful',
		user: req.user,
	});
});

authRouter.get('/failure',(req,res) => {
	res.json({
		auth: false,
		message: 'login failed',
		user: null,
	});
});

//logout
authRouter.get('/logout', (req,res) => {
	req.logout();
	res.json({
		message: 'logout successful',
	});
});

module.exports = authRouter;