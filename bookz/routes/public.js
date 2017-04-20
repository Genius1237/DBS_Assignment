var express = require('express');
var router = express.Router();
var path=require('path');
var jwt=require('jsonwebtoken');
var db=require('../misc/database');

router.get('/signin', function(req, res) {
  res.sendFile(path.join(__dirname,'../views/signin.html'));
});

router.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname,'/../views/signup.html'));
});

router.get('/home', function(req, res) {
	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var nname=decoded.name;

  res.render(path.join(__dirname,'/../views/home.ejs'), {name: nname});
});

router.get('/buy', function(req, res) {
	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var nname=decoded.name;
  res.render(path.join(__dirname,'/../views/buy.ejs'), {name: nname});
});

router.get('/sell', function(req, res) {
	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var nname=decoded.name;
  res.render(path.join(__dirname,'/../views/sell.ejs'), {name: nname});
});

router.get('/settings', function(req, res) {
	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var nname=decoded.name;
	var uname=decoded.username;
	var ph=decoded.phone;
  res.render(path.join(__dirname,'/../views/settings.ejs'), {name: nname, username: uname, phone: ph, password: '********'});
});

router.get('/posts', function(req, res) {
	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var nname=decoded.name;
  res.render(path.join(__dirname,'/../views/posts.ejs'), {name: nname});
});

router.get('/search', function(req, res) {
	if(req.query.query!=null&&req.query.option!=null){

		var querystring=req.query.query;
		var option=req.query.option;
		var table,stable;
		var optional="";
		//console.log(querystring,option);
		switch(option){
			case 'bs': 	table = 'BOOK_SELL';
						stable='BOOK';
						optional="BOOK_SELL.conditiono,";
						break;
			case 'bb': 	table = 'BOOK_BUY';
						stable='BOOK';
						break;
			case 'is': 	table = 'ITEM_SELL';
						stable='ITEM';
						break;
			case 'ib': 	table = 'ITEM_BUY';
						stable='ITEM';
						break;
		}
		var query,type;
		if(option[0]=='b'){
			query = 'SELECT BOOK.title,BOOK.author,BOOK.publisher,BOOK.edition,BOOK.year,'+table+'.price,'+optional+'USER.name,USER.phone FROM '+table+',BOOK,USER WHERE BOOK._id='+table+'.link_id AND '+table+".user=USER._id AND (BOOK.title LIKE ? OR BOOK.author LIKE ? )";
		}else if(option[0]=='i'){
			query = 'SELECT ITEM.name,ITEM.description,'+table+'.price,USER.name as nameu,USER.phone FROM '+table+',ITEM,USER WHERE ITEM._id='+table+'.link_id AND '+table+".user=USER._id AND (ITEM.name LIKE ? OR ITEM.description LIKE ? )";
		}
		if(option[1]==='b'){
			type='Buy';
		}else if(option[1]==='s'){
			type='Sell';
		}
		
		//console.log(query,querystring);

		var parameters=['%'+querystring+'%','%'+querystring+'%'];
		var connection=db();
		connection.query(query,parameters,function(error,results){
			if(error){
				console.log(error);
				res.sendStatus(404);
			}else{
				//console.log(results[0].title);
				var results1=[];
				for(var i=0;i<results.length;i++){
					var r=results[i];
					if(option[0]=='b'){
						if(option[1]=='s'){
							results1.push(
								{
								    what: {
								      'Title': r.title,
								      'Author': r.author,
								      'Publisher': r.publisher,
								      'Year of publishing': r.year,
								      'Edition': r.edition,
								      'Condition': r.conditiono,
								      'Cost': r.price
								    },
								    who: {
								      'Name': r.name,
								      'Phone': r.phone
								    }
								  }
								);
						}else{
							results1.push(
								{
								    what: {
								      'Title': r.title,
								      'Author': r.author,
								      'Publisher': r.publisher,
								      'Year of publishing': r.year,
								      'Edition': r.edition,
								      'Willing to Pay': r.price
								    },
								    who: {
								      'Name': r.name,
								      'Phone': r.phone
								    }
								  }
								);
						}
					}else if(option[0]=='i'){
						if(option[1]=='s'){
							results1.push(
								{
								    what: {
								    	'Name':r.name,
	        							'Description': r.description,
	        							'Cost': r.price
									},
								    who: {
								      'Name': r.nameu,
								      'Phone': r.phone
								    }
								  }
								);
						}else{
							results1.push(
								{
								    what: {
								    	'Name':r.name,
	        							'Description': r.description,
	        							'Willing to Pay': r.price
									},
								    who: {
								      'Name': r.nameu,
								      'Phone': r.phone
								    }
								  }
								);
						}
					}
				}



				var token = req.cookies.name;
				var decoded=jwt.decode(token);
				var name=decoded.name;
				res.render(path.join(__dirname,'/../views/search.ejs'), {sellOrBuy: type, results: results1, name: name});
			}
		});
	}else{
		res.sendStatus(404);
	}
});

router.get('/posts/sell', function(req, res) {
	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var nname=decoded.name;

	var userid=decoded.id;
	var query1='SELECT * FROM BOOK_SELL,BOOK WHERE BOOK_SELL.link_id=BOOK._id AND BOOK_SELL.user=?';
	var query2='SELECT * FROM ITEM_SELL,ITEM WHERE ITEM_SELL.link_id=ITEM._id AND ITEM_SELL.user=?';

	var results_buy_sell={"books":[],"items":[]};
	var connection=db();
	connection.query(query1,[userid],function(error,results){
		if(error){
			console.log(error);
			res.sendStatus(404);
		}else{
			for(var i=0;i<results.length;i++){
				var r=results[i];
				results_buy_sell.books.push({
							    what: {
							      'Title': r.title,
							      'Author': r.author,
							      'Publisher': r.publisher,
							      'Year of publishing': r.year,
							      'Edition': r.edition,
							      'Condition': r.conditiono,
							      'Cost': r.price
							    },
							    id: r._id
							  });
			}
			connection.query(query2,[userid],function(error,results){
				if(error){
					console.log(error);
					res.sendStatus(404);
				}else{
					for(var i=0;i<results.length;i++){
					var r=results[i];
					results_buy_sell.items.push({
								    what: {
								    	'Name':r.name,
	        							'Description': r.description,
	        							'Cost': r.price
									},
								    id: r._id
								  });
					}

				}
				//console.log(results_buy_sell);
				res.render(path.join(__dirname,'/../views/edit_sell_buy.ejs'), {results: results_buy_sell, name: nname});
			});
		}
	});

});

router.get('/posts/buy', function(req, res) {
  	var token = req.cookies.name;
	var decoded=jwt.decode(token);
	var nname=decoded.name;

	var userid=decoded.id;
	var query1='SELECT * FROM BOOK_BUY,BOOK WHERE BOOK_BUY.link_id=BOOK._id AND BOOK_BUY.user=?';
	var query2='SELECT * FROM ITEM_BUY,ITEM WHERE ITEM_BUY.link_id=ITEM._id AND ITEM_BUY.user=?';

	var results_buy_sell={"books":[],"items":[]};
	var connection=db();
	connection.query(query1,[userid],function(error,results){
		if(error){
			console.log(error);
			res.sendStatus(404);
		}else{
			for(var i=0;i<results.length;i++){
				var r=results[i];
				results_buy_sell.books.push({
							    what: {
							      'Title': r.title,
							      'Author': r.author,
							      'Publisher': r.publisher,
							      'Year of publishing': r.year,
							      'Edition': r.edition,
							      'Cost': r.price
							    },
							    id: r._id
							  });
			}
			connection.query(query2,[userid],function(error,results){
				if(error){
					console.log(error);
					res.sendStatus(404);
				}else{
					for(var i=0;i<results.length;i++){
					var r=results[i];
					results_buy_sell.items.push({
								    what: {
								    	'Name':r.name,
	        							'Description': r.description,
	        							'Cost': r.price
									},
								    id: r._id
								  });
					}

				}
				//console.log(results_buy_sell);
				res.render(path.join(__dirname,'/../views/edit_sell_buy.ejs'), {results: results_buy_sell, name: nname});
			});
		}
	});
});

module.exports = router;
