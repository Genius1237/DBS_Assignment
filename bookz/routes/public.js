var express = require('express');
var router = express.Router();
var path=require('path');

router.get('/signin', function(req, res) {
  res.sendFile(path.join(__dirname,'../views/signin.html'));
});

router.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname,'/../views/signup.html'));
});

router.get('/home', function(req, res) {
  res.render(path.join(__dirname,'/../views/home.ejs'), {name: 'namehere'});
});

router.get('/buy', function(req, res) {
  res.render(path.join(__dirname,'/../views/buy.ejs'), {name: 'namehere'});
});

router.get('/sell', function(req, res) {
  res.render(path.join(__dirname,'/../views/sell.ejs'), {name: 'namehere'});
});

router.get('/settings', function(req, res) {
  res.render(path.join(__dirname,'/../views/settings.ejs'), {name: 'namehere', username: 'namenamehere', phone: '00000000', password: 'xxxxxxxxxx'});
});

router.get('/posts', function(req, res) {
  res.render(path.join(__dirname,'/../views/posts.ejs'), {name: 'namehere'});
});

module.exports = router;
