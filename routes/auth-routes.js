const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

//register new user
authRouter.post('/register', usersController.create);

//authenticate user
authRouter.post('/login', passport.authenticate('local', {
	successRedirect: '/auth/success',
	failureRedirect: '/login',
	//failureFlash: true,
}));

//user is authenticated
authRouter.get('/success',(req,res) => {
	res.json({
		auth: true,
		message: 'ok',
		user: req.user,
	});
});

//user is not authenticated
authRouter.get('/failure',(req,res) => {
	res.json({
		auth: false,
		message: 'login failed',
		user: null,
	});
});


authRouter.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/');
});

module.exports = authRouter;