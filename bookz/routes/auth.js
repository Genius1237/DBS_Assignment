var express = require('express');
var jwt = require('jsonwebtoken');
var data = require('../misc/constants');

var router = express.Router();

//Verify Cookie
router.use('/', function(req, res, next) {
  if (!(req.path === '/users/login' || req.path === '/users/signup')){
  	console.log(req.path);

  	//Do Cookie extraction and verification here
  	
  	//Need to change this line
  	var token = req.get('Authentication');
    jwt.verify(token, data.key, function (err, decoded) {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                var message = {
                    "message": data.expiredTokenError
                }
                res.send(message);
                res.end();

            } else {
                var message = {
                   "message": data.invalidTokenError
                }
                res.send(message);
                res.end();
            }
    	}else{
        	next();
        }
	});
  	//Since next gets called, it goes to the necessary url
	}else{ //Login or signup
  		next();
	}
});

module.exports = router;