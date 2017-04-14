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
  res.render(path.join(__dirname,'/../views/home.ejs'), {user: 'namehere'});
});

router.get('/buy', function(req, res) {
  res.render(path.join(__dirname,'/../views/buy.ejs'), {user: 'namehere'});
});

router.get('/sell', function(req, res) {
  res.render(path.join(__dirname,'/../views/sell.ejs'), {user: 'namehere'});
});

router.get('/settings', function(req, res) {
  res.render(path.join(__dirname,'/../views/settings.ejs'), {user: 'namehere'});
});

router.get('/posts', function(req, res) {
  res.render(path.join(__dirname,'/../views/posts.ejs'), {user: 'namehere'});
});

module.exports = router;
