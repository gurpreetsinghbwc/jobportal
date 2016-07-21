var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

	fullname: String,
	email: String,
	address: String,
	city: String,
	username: String,
	password: String,
	rpassword: String,


});

var Admin = mongoose.model('Admin', userSchema);

module.exports = {
	Admin : Admin
};