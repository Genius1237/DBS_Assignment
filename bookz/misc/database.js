var mysql=require('mysql');

var db=null;

module.exports=function(){
	if(!db){
		db=mysql.createConnection({
			host	 :  '127.0.0.1',
			port	 :  3306,
			user     : 'bookz' ,
			password : '1234567890',
			database : 'bookz'
		});
	}
	return db;
};