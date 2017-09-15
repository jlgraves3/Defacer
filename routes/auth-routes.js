const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

//register - create new user
authRouter.post('/register', usersController.create);

//login
authRouter.post('/login', passport.authenticate('local'));

//logout
authRouter.get('/logout', (req,res) => {
	req.logout();
	res.json({
		message: 'logout successful',
	});
});

module.exports = authRouter;