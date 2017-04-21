var express = require('express');
var jwt=require('jsonwebtoken');
var db=require('../misc/database');
var router = express.Router();

router.post('/', function(req, res, next) {
	var name=req.body.name;
	var description=req.body.description;
	var cost=req.body.cost;
	var action=req.body.action;

	if(action!=null&&action!=""){
		if(action=="sell"){
			if(name!=null&&name!=""&&description!=null&&description!=""&&cost!=null&&cost!=""){
				var cost=parseInt(cost);

				var query="INSERT INTO ITEM(name,description) VALUES(?,?)";
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
		}else if(action=="buy"){
			if(name!=null&&name!=""&&description!=null&&description!=""&&cost!=null&&cost!=""){
				var cost=parseInt(cost);

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
				res.sendStatus(404);
			}

		}else{
			res.sendStatus(404);
		}
	}
});

router.put('/', function(req, res, next) {
	var name=req.body["Name"];
	var description=req.body["Description"];
	var cost=req.body["Cost"];
	var action=req.body["category"];
	var itemid=req.body.id;

	if(action!=null&&action!=""){
		if(action=="sell"){
			if(name!=null&&name!=""&&description!=null&&description!=""&&cost!=null&&cost!=""){
				var cost=parseInt(cost);

				var query="UPDATE ITEM SET name=?,description=? WHERE _id=?";
				var connection=db();
				var params=[name,description,itemid];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="UPDATE ITEM_SELL SET price=? WHERE link_id=?";
						var params2=[cost,itemid];
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
		}else if(action=="buy"){
			if(name!=null&&name!=""&&description!=null&&description!=""&&cost!=null&&cost!=""){
				var cost=parseInt(cost);
				
				var query="UPDATE ITEM SET name=?,description=? WHERE _id=?";
				var connection=db();
				var params=[name,description,itemid];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="UPDATE ITEM_BUY SET price=? WHERE link_id=?";
						var params2=[cost,itemid];
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

		}else{
			res.sendStatus(404);
		}
	}
	
});

router.delete('/', function(req, res, next) {
	var itemid=req.body.id;
	if(itemid!=null&&itemid!=""){

		var id=parseInt(itemid);
		var table="";

		var query="DELETE FROM ITEM WHERE _id=?";
		var params=[id];
		console.log(query,id);
		var connection=db();
		connection.query(query,params,function(error,result){
			if(error){
				console.log(error);
				res.sendStatus(404);
			}else{
				res.sendStatus(200);
			}
		});
	}
});

module.exports = router;
