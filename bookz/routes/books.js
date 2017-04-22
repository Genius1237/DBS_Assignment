var express = require('express');
var jwt=require('jsonwebtoken');
var db=require('../misc/database');
var router = express.Router();

router.post('/', function(req, res, next) {
	var title=req.body.title;
	var author=req.body.author;
	var publisher=req.body.publisher;
	var edition=req.body.edition;
	var year=req.body.year;
	var condition=req.body.condition;
	var cost=req.body.cost;
	var action=req.body.action;

	if(action!=null&&action!=""){
		if(action=="sell"){
			if(title!=null&&title!=""&&author!=null&&author!=""&&publisher!=null&&publisher!=""&&edition!=null&&edition!=""&&year!=null&&year!=""&&condition!=null&&condition!=""&&cost!=null&&cost!=""){
				var cost=parseInt(cost);
				var year=parseInt(year);

				var query="INSERT INTO BOOK(title,author,publisher,edition,year) VALUES(?,?,?,?,?)";
				var connection=db();
				var params=[title,author,publisher,edition,year];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="INSERT INTO BOOK_SELL(link_id,user,price,conditiono) VALUES(?,?,?,?)";
						var token = req.cookies.name;
						var decoded=jwt.decode(token);
						var id=decoded.id;
						var params2=[results.insertId,id,cost,condition];
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
			if(title!=null&&title!=""&&author!=null&&author!=""&&publisher!=null&&publisher!=""&&edition!=null&&edition!=""&&year!=null&&year!=""&&cost!=null&&cost!=""){
				var year=parseInt(year);
				var cost=parseInt(cost);

				var query="INSERT INTO BOOK(title,author,publisher,edition,year) VALUES(?,?,?,?,?)";
				var connection=db();
				var params=[title,author,publisher,edition,year];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="INSERT INTO BOOK_BUY(link_id,user,price) VALUES(?,?,?)";
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
	var title=req.body["Title"];
	var author=req.body["Author"];
	var publisher=req.body["Publisher"];
	var edition=req.body["Edition"];
	var year=req.body["Year of publishing"];
	var condition=req.body["Condition"];
	var cost=req.body["Cost"];
	var action=req.body["category"];
	var bookid=req.body.id;

	if(action!=null&&action!=""){
		if(action=="sell"){
			if(title!=null&&title!=""&&author!=null&&author!=""&&publisher!=null&&publisher!=""&&edition!=null&&edition!=""&&year!=null&&year!=""&&condition!=null&&condition!=""&&cost!=null&&cost!=""){
				var cost=parseInt(cost);
				var year=parseInt(year);

				var query="UPDATE BOOK SET title=?,author=?,publisher=?,edition=?,year=? WHERE _id=?";
				var connection=db();
				var params=[title,author,publisher,edition,year,bookid];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="UPDATE BOOK_SELL SET price=?,conditiono=? WHERE link_id=?";
						var params2=[cost,condition,bookid];
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
			if(title!=null&&title!=""&&author!=null&&author!=""&&publisher!=null&&publisher!=""&&edition!=null&&edition!=""&&year!=null&&year!=""){
				var year=parseInt(year);
				var cost=parseInt(cost);
				var query="UPDATE BOOK SET title=?,author=?,publisher=?,edition=?,year=? WHERE _id=?";
				var connection=db();
				var params=[title,author,publisher,edition,year,bookid];
				connection.query(query,params,function(err,results){
					if(err){
						console.log(err);
						res.sendStatus(404);
					}else{
						//console.log(results.insertId);
						var query2="UPDATE BOOK_BUY SET price=? WHERE link_id=?";
						var params2=[cost,bookid];
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
	var bookid=req.body.id;
	if(bookid!=null&&bookid!=""){

		var id=parseInt(bookid);
		var table="";

		var query="DELETE FROM BOOK WHERE _id=?";
		var params=[id];
		//console.log(query,id);
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
