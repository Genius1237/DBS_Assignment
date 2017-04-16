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
  res.render(path.join(__dirname,'/../views/settings.ejs'), {name: 'namehere', username: 'namenamehere', phone: '00000000', password: 'something'});
});

router.get('/posts', function(req, res) {
  res.render(path.join(__dirname,'/../views/posts.ejs'), {name: 'namehere'});
});

//////////////// Temporary //////////////////////
var results1 = [
  {
    what: {
      'Title': 'abcd',
      'Author': 'nope',
      'Publisher': 'nope',
      'Year of publishing': 'nope',
      'Edition': 'nope',
      'Condition': 'nope',
      'Cost': 'nope'
    },
    who: {
      'Name': 'abcd',
      'Phone': '0000'
    }
  },
  {
    what: {
      'Title': 'abcd',
      'Author': 'nope',
      'Publisher': 'nope',
      'Year of publishing': 'nope',
      'Edition': 'nope',
      'Condition': 'nope',
      'Cost': 'nope'
    },
    who: {
      'Name': 'abcd',
      'Phone': '0000'
    }
  },
  {
    what: {
      'Title': 'abcd',
      'Author': 'nope',
      'Publisher': 'nope',
      'Year of publishing': 'nope',
      'Edition': 'nope',
      'Condition': 'nope',
      'Cost': 'nope'
    },
    who: {
      'Name': 'abcd',
      'Phone': '0000'
    }
  },
  {
    what: {
      'Title': 'abcd',
      'Author': 'nope',
      'Publisher': 'nope',
      'Year of publishing': 'nope',
      'Edition': 'nope',
      'Condition': 'nope',
      'Cost': 'nope'
    },
    who: {
      'Name': 'abcd',
      'Phone': '0000'
    }
  }
]

router.get('/search', function(req, res) {
  res.render(path.join(__dirname,'/../views/search.ejs'), {sellOrBuy: 'Sell', results: results1, name: 'namehere'});
});

var results_buy_sell = {
  books: [
    {
      what: {
        'Title': 'abcd',
        'Author': 'nope',
        'Publisher': 'nope',
        'Year of publishing': 'nope',
        'Edition': 'nope',
        'Condition': 'nope',
        'Cost': 'nope'
      },
      id: 1
    },
    {
      what: {
        'Title': 'abcd',
        'Author': 'nope',
        'Publisher': 'nope',
        'Year of publishing': 'nope',
        'Edition': 'nope',
        'Condition': 'nope',
        'Cost': 'nope'
      },
      id: 2
    }
  ],


  items: [
    {
      what: {
        'Description': 'nope',
        'Cost': 'nope'
      },
      id: 1
    },
    {
      what: {
        'Description': 'nope',
        'Cost': 'nope'
      },
      id: 2
    }
  ]

};

router.get('/posts/sell', function(req, res) {
  res.render(path.join(__dirname,'/../views/edit_sell_buy.ejs'), {results: results_buy_sell, name: 'namehere'});
});

router.get('/posts/buy', function(req, res) {
  res.render(path.join(__dirname,'/../views/edit_sell_buy.ejs'), {results: results_buy_sell, name: 'namehere'});
});

//////////////// Temporary //////////////////////

module.exports = router;
