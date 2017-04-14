var express = require('express');
var jwt = require('jsonwebtoken');
var data = require('../misc/constants');

var router = express.Router();

//Verify Cookie
router.use('/', function(req, res, next) {
  if (!(req.path === '/public/signin' || req.path === '/public/signup'|| (req.path==='/users'&&req.method==='POST')||(req.path==='/signin'))){
  	console.log('Redirecting from: '+req.path);

  	//Do Cookie extraction and verification here
  	
  	//Need to change this line
  	var token = req.get('Authentication');
    jwt.verify(token, data.key, function (err, decoded) {
        if (err) {
            res.redirect('/public/signin');
            }
        else{
        	next();
        }
	});
  	//Since next gets called, it goes to the necessary url
	}else{ //Login or signup
  		next();
	}
});

module.exports = router;