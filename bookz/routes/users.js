var express = require('express');
var crypto=require('crypto');
var db=require('../misc/database');
var key=require('../misc/constants').key;
var jwt=require('jsonwebtoken');
var download=require('../misc/qproc');
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
					//console.log(id);
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
	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var uid=decoded.id;
	if (password != null&&password!=""&&name != null && phone != null && name!="" &&phone!="") {
		var invalidfields=[];
		if(password.length<8||password.length>20){
			invalidfields.push('password');
		}
		if(/^\d{10}$/.test(phone)==false){
			invalidfields.push('phone');
		}
		var phone=parseInt(phone);
		if(invalidfields.length!=0){
			res.send({
				valid: 'false',
				invalidFields: invalidfields
			});
			console.log(invalidfields);
			res.end();
		}else{
			if(password!='********'){
				var length=10;	
				var salt=crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
				var hash=crypto.createHmac('sha512',salt);
				hash.update(password);
				var hashed=hash.digest('hex');

				var toinsert=salt+'.'+hashed;
				var post=[name,phone,toinsert,uid];
				var connection=db();
				connection.query('UPDATE USER SET name=?,phone=?,password=? WHERE _id=?',post,function(error,results){
					if(error){
						//console.log(error.code);
						console.log(error);
					}else{
						if(results.length!=0) {
							var token = jwt.sign({
													'username' : decoded.username,
													'id' : decoded.id,
													'name' : name,
													'phone' : phone
												},key);
							res.clearCookie('name');
							res.cookie('name',token);
							res.json({
								invalidFields :[],
								valid:"true"
							});
						}else{
							res.json({
								valid:"false"
							});
						}
					}
				});
			}else{
				var post=[name,phone,uid];
				var connection=db();
				connection.query('UPDATE USER SET name=?,phone=? WHERE _id=?',post,function(error,results){
					if(error){
						//console.log(error.code);
						console.log(error);
						res.json({
								valid:"false"
							});
					}else{
						if(results.length!=0) {
							var token = jwt.sign({
													'username' : decoded.username,
													'id' : decoded.id,
													'name' : name,
													'phone' : phone
												},key);
							res.clearCookie('name');
							res.cookie('name',token);
							res.json({
								invalidFields :[],
								valid:"true"
							});
						}else{
							res.json({
								valid:"false"
							});
						}
					}
				});	
			}
		}	
    }else{
    	res.json({
				valid:"false"
			});
    }
});
router.get('/books',function(req,res,next) {
	var token = req.cookies.name;
	var decoded = jwt.decode(token);
	var id = decoded.id;
	var q1 = "SELECT * FROM BOOK_BUY WHERE user=?";
	var q2 = "SELECT * FROM BOOK_SELL WHERE user=?";
	var params = [id];
	download(res,q1,params,q2,params);
});
router.get('/items',function(req,res,next) {
	var token = req.cookies.name;
	var decoded = jwt.decode(token);
	var id = decoded.id;
	var q1 = "SELECT * FROM ITEMS_BUY WHERE user=?";
	var q2 = "SELECT * FROM ITEMS_SELL WHERE user=?";
	var params = [id];
	download(res,q1,params,q2,params);
});
module.exports = router;