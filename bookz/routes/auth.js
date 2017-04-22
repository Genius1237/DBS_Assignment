var express = require('express');
var jwt = require('jsonwebtoken');
var key = require('../misc/constants').key;

var router = express.Router();

router.get('/',function(req,res){
  if(req.path='/'){
    res.redirect('/public/home');  
  }
});

//Verify Cookie
router.use('/', function(req, res, next) {
  
  var token = req.cookies.name;
    //console.log(token);
    jwt.verify(token, key, function (err, decoded) {
        if (err) {
            if ((req.path === '/public/signin' || req.path === '/public/signup'|| (req.path==='/users'&&req.method==='POST')||(req.path==='/users/signin'))){
                next();
              }else{
                //console.log('Redirecting from: '+req.path);
                res.redirect('/public/signin');
              }
            }
        else{
          next();
        }
  });
});

module.exports = router;