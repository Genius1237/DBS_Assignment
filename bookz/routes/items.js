var express = require('express');
var jwt=require('jsonwebtoken');
var db=require('../misc/database');
var router = express.Router();
router.get('/',function(req,res,next) {

});
router.post('/', function(req, res, next) {
	var name=req.body.name;
	var description=req.body.description;
	var cost = req.body.cost;
	var action = req.body.action;
	//console.log("going fine till 1");
	if(action!=null&&action!==""){
		if(action==="sell"){
			//console.log(req.body);
			if(name!=null && name!=="" && description!=null && description!=="" && cost!=null && cost!==""){
				var cost=parseInt(cost);
				console.log(name);
				var query="INSERT INTO ITEM(name,description) VALUES(?,?)";
				console.log('sucess');
				var connection=db();
				var params=[name,description];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="INSERT INTO ITEM_SELL(link_id,user,price) VALUES(?,?,?)";
						var token = req.cookies.name;
						var decoded=jwt.decode(token);
						var id=decoded.id;
						var params2=[results.insertId,id,cost];
						connection.query(query2,params2,function(err,results){
							if(err){
								console.log(err);
								res.sendStatus(404);
							}else{
								res.sendStatus(200);
							}
						});
					}
				});

			}else{
				res.sendStatus(404);
			}
		}else if(action==="buy"){
			if(name!=null && name!=="" && description!=null && description!=="" && cost!=null && cost!==""){
				var query="INSERT INTO ITEM(name,description) VALUES(?,?)";
				var connection=db();
				var params=[name,description];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="INSERT INTO ITEM_BUY(link_id,user,price) VALUES(?,?,?)";
						var token = req.cookies.name;
						var decoded=jwt.decode(token);
						var id=decoded.id;
						var params2=[results.insertId,id,cost];
						connection.query(query2,params2,function(err,results){
							if(err){
								console.log(err);
								res.sendStatus(404);
							}else{
								res.sendStatus(200);
							}
						});
					}
				});

			}else{
				console.log(name+" "+description);
				console.log('Here2');
				res.sendStatus(404);
			}

		}else{
			console.log('Here3');
			res.sendStatus(404);
		}
	}

});
module.exports = router;