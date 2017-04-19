var express = require('express');
var jwt=require('jsonwebtoken');
var db=require('../misc/database');
var router = express.Router();

router.get('/', function(req, res, next) {
	
});

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
			if(title!=null&&title!=""&&author!=null&&author!=""&&publisher!=null&&publisher!=""&&edition!=null&&edition!=""&&year!=null&&year!=""){
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
