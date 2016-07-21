module.exports = function() {
  var passport = require('passport');
  var bcrypt = require('bcrypt');
  var passportLocal = require('passport-local');
  var adminService = require('../services/admin-service');
  
  passport.use(new passportLocal.Strategy({usernameField: 'username'}, function(username, password, next) {
    adminService.findUser(username, function(err, admin) {
      if (err) {
        return next(err);
      }
      if (!admin) {
        return next(null, null);
      }
      bcrypt.compare(password, admin.password, function(err, same) {
        if (err) {
          return next(err);
        }
        if (!same) {
          return next(null, null);
        }
        next(null, admin);
      });
    });
  }));
  
  passport.serializeUser(function(admin, next) {
    next(null, admin.username);
  });
  
  passport.deserializeUser(function(username, next) {
    adminService.findUser(username, function(err, admin) {
      next(err, admin);
    });
  });
};