const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersController = {};

//create new user
usersController.create = (req,res) => {
	//encrypt password
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(req.body.password, salt);
	//add to database
	User.create({
		username: req.body.username,
		password_digest: hash
	}).then(user => {
		req.login(user, (err) => {
			if (err) return next(err);
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
}

usersController.index = (req,res) => {
	res.json({
		user: req.user
	});
}

module.exports = usersController; 