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
		connection.query('SELECT * from USER WHERE username=?',q,function(error,results){
			//console.log(results);
			if(results==null||results.length==0){
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
					var id=results[0]._id;
					var name=results[0].name;
					var ph=results[0].phone;
					var token=jwt.sign({
										'username': username,
										'id':id,
										'name':name,
										'phone':ph
										},key);
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
		var invalidfields=[];
		if(password.length<8||password.length>20){
			invalidfields.push('password');
		}
		if(/^\d{10}$/.test(phone)==false){
			invalidfields.push('phone');
		}

		if(invalidfields.length!=0){
			res.send({
				usernameTaken: 'false',
				valid: 'false',
				invalidFields: invalidfields
			});
			console.log(invalidfields);
			res.end();
		}else{
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
					//console.log(error.code);
					switch(error.code){
						case 'ER_DUP_ENTRY':{ //ER_DUP_ENTRY
							res.send({
								usernameTaken: 'true',
								valid: 'false'
							});
							break;
						}
					}
					//console.log(error);
				}else{
					res.json({
						valid:"true"
					});
				}
			});
		}
    }
});

router.put('/',function(req,res,next){
	var username=req.body.username;
	var password=req.body.password;
	var name=req.body.name;
	var phone=req.body.phone;
	if (username != null && password != null && username!="" &&password!=""&&name != null && phone != null && name!="" &&phone!="") {
		var invalidfields=[];
		if(password.length<8||password.length>20){
			invalidfields.push('password');
		}
		if(/^\d{10}$/.test(phone)==false){
			invalidfields.push('phone');
		}

		if(invalidfields.length!=0){
			res.send({
				valid: 'false',
				invalidFields: invalidfields
			});
			console.log(invalidfields);
			res.end();
		}else{
			var length=10;	
			var salt=crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
			var hash=crypto.createHmac('sha512',salt);
			hash.update(password);
			var hashed=hash.digest('hex');

			var toinsert=salt+'.'+hashed;

			//Insert into database
			var post=[name,phone,toinsert,username];
			
			var connection=db();
			connection.query('UPDATE USER SET name=?,phone=?,password=? WHERE username=?',post,function(error){
				if(error){
					//console.log(error.code);
						
					//console.log(error);
				}else{
					res.json({
						valid:"true"
					});
				}
			});
		}
    }
});

module.exports = router;