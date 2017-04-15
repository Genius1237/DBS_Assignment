var express = require('express');
var crypto=require('crypto');
var db=require('../misc/database');
var key=require('../misc/constants').key;
var jwt=require('jsonwebtoken');
var router = express.Router();

//POST request, for login
router.post('/signin', function(req, res, next) {
	var username=req.body.username;
	var password=req.body.password;
	if (username != null && password != null&&username!==""&&password!=="") {
		
		//SELECT PASSWORD FROM USERS WHERE USERNAME=username
		//Password stored in pwd

		var connection=db();
		var q=[username];
		connection.query('SELECT password from USER WHERE username=?',q,function(error,results){
			if(results.length==0){
				res.send({
						valid:"false"
					});
			}else{
				var pwd=results[0].password;
				var temp=pwd.split('.');
				var salt=temp[0];
				var p=temp[1];

				var length=10;	
				var hash=crypto.createHmac('sha512',salt);
				hash.update(password);
				var hashed=hash.digest('hex');

				if(hashed===p){
					var token=jwt.sign(username,key);
					//console.log(token);
					res.cookie('name',token);
					res.send({
						valid:"true"
					});
				}else{
					res.send({
						valid:"false"
					});
				}	
			}
		});

    }
});

router.get('/signout',function(req,res){
	res.clearCookie('name');
	res.redirect('/public/home');
});

router.post('/',function(req,res,next){
	var username=req.body.username;
	var password=req.body.password;
	var name=req.body.name;
	var phone=req.body.phone;
	if (username != null && password != null && username!="" &&password!="") {
		
		var length=10;	
		var salt=crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
		var hash=crypto.createHmac('sha512',salt);
		hash.update(password);
		var hashed=hash.digest('hex');

		var toinsert=salt+'.'+hashed;

		//Insert into database
		var post=[username,toinsert,name,phone];
		var connection=db();
		connection.query('INSERT INTO USER(username,password,name,phone) VALUES(?,?,?,?)',post,function(error){
			if(error){
				switch(error.code){
					case 1062:{ //ER_DUP_ENTRY

						break;
					}

				}
				console.log(error);
			}else{
				res.json({
					valid:"true"
				});
				res.redirect('/public/home');
			}
		});

    }
});

module.exports = router;
