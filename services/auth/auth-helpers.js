const bcrypt = require('bcryptjs');
const User = require('../../models/user');

//compate passwords
function comparePass(userPassword, databasePassword) {
	return bcrypt.compareSync(userPassword, databasePassword);
}
module.exports = {
	comparePass,
}