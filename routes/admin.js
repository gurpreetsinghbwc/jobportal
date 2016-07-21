var express = require('express');
var router = express.Router();
var passport = require('passport');

var adminService = require('../services/admin-service');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  
  res.render('admin/index', {title: 'Login'})
});
*/

// View The Admin Login Page...
router.get('/', function(req, res, next) {
	res.render('admin/login', {title: 'Login'});
});


/*router.get('/login', function(req, res, next) {
	
  var vm = {

    title: "Create An Account"

  };

  res.render('users/create', vm);

});*/


// Add Admin Data To The Database ...
router.post('/create', function(req, res, next) {
	var vm = {
      
      title: 'Create Admin'

	};
	adminService.addUser(req.body ,function(err) {

		if (err) {

			var vm = {

				title: 'Create An Account',
				input: req.body,
				error: 'Something went wrong'

			};

			delete vm.input.password;
			return render('/admin/create', vm);


		};

		res.render('admin/login', {title: 'Login'});

	});



});

router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: '/admin', 
    successRedirect: '/admin/index',
    failureFlash: 'Invalid credentials'
  }));

/*router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));*/
router.get('/', function(req, res, next) {

	req.logout();
	res.render('/');
});

router.get('/index' , function(req, res, next) {
    res.render('admin/index', {title: 'Dashboard'});
});

module.exports = router;
