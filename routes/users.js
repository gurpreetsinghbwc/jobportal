var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');

});

router.get('/create', function(req, res, next) {
	
  var vm = {

    title: "Create An Account"

  };

  res.render('users/create', vm);

});

/*router.get('/login', function(req, res, next) {

	res.render('users/page-login', {title: 'Login'});
});*/

router.get('/login', function(req, res, next) {
	
  var vm = {

    title: "Create An Account"

  };

  res.render('users/login', vm);

});



module.exports = router;
