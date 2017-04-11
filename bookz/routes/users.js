var express = require('express');
var crypto=require('crypto');
var router = express.Router();

//POST request, for login
router.post('/login', function(req, res, next) {
	var username=req.body.username;
	var password=req.body.password;
	if (username != null && password != null) {
		
		//SELECT PASSWORD FROM USERS WHERE USERNAME=username
		//Password stored in pwd

		var temp=pwd.split('.');
		var salt=temp[0];
		var p=temp[1];

		var length=10;	
		var hash=crypto.createHmac('sha512',salt);
		hash.update(password);
		var hashed=hash.digest('hex');

		if(hashed==p){

		}else{
			
		}

    }
});

router.post('/signup',function(req,res,next){
	var username=req.body.username;
	var password=req.body.password;
	if (username != null && password != null && username!="" &&password!="") {
		
		var length=10;	
		var salt=crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
		var hash=crypto.createHmac('sha512',salt);
		hash.update(password);
		var hashed=hash.digest('hex');

		var toinsert=salt+'.'+hashed;

		//Insert into database

    }
});

module.exports = router;
