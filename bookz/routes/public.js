var express = require('express');
var router = express.Router();

router.get('/signin', function(req, res) {
  res.sendFile('../views/signin.html');
});

router.get('/signup', function(req, res) {
  res.sendFile('../views/signup.html');
});

router.get('/home', function(req, res) {
  res.render('../views/home.ejs', {user: 'namehere'});
});

router.get('/buy', function(req, res) {
  res.render('../views/buy.ejs', {user: 'namehere'});
});

router.get('/sell', function(req, res) {
  res.render('../views/sell.ejs', {user: 'namehere'});
});

router.get('/settings', function(req, res) {
  res.render('../views/settings.ejs', {user: 'namehere'});
});

router.get('/posts', function(req, res) {
  res.render('../views/posts.ejs', {user: 'namehere'});
});

module.exports = router;
