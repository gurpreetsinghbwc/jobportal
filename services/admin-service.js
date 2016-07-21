var Admin = require('../models/admin').Admin;
var bCrypt = require('bcrypt');
var LocalStrategy   = require('passport-local').Strategy;

// Generating The hashPassword...
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
exports.addUser = function(admin, next) {

	var newUser = new Admin({

	fullname: admin.fullname,
	email: admin.email,
	address: admin.address,
	city: admin.city,
	username: admin.username,
	password: createHash(admin.password),
	

	});

	newUser.save(function(err) {
        
        if (admin.password !== admin.rpassword) {

        if (err) {

        	return next(err);

        }
    }
        next(null);
	});
};

exports.findUser = function(username, next) {
  Admin.findOne({username: username}, function(err, admin) {
    next(err, admin);    
  });
};
/*var createHash = function(password) {
	return bcrypt.hashSync(password, bCrypt.genSaltSyn(10), null);
}*/

/*module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not
            User.findOne({ 'username' :  username }, 
                function(err, admin) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!admin){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(admin, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, admin);
                }
            );

        })
    );
}*/