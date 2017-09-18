const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersController = {};

//add new user to database
usersController.create = (req,res) => {
	//encrypt password
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(req.body.options.password, salt);
	//add to database
	User.create({
		username: req.body.options.username,
		password_digest: hash
	}).then(user => {
		req.login(user, (err) => {
			if (err) return next(err);
			res.json({
				message: 'register successful',
				user: user,
				auth: true,
			});
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