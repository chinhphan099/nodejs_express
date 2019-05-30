var express = require('express');
var db = require('../db');
var shortid = require('shortid');
var router = express.Router();

// Render all users
router.get('/', function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
});

// Get query string from form Search -> then Render by using index paget as template.
router.get('/search', function(req, res) {
  var q = req.query.q;
  var matchedUser = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUser,
    q: q
  })
});

// Create user page
router.get('/create', function(req, res) {
  res.render('users/create');
});
// Post data from create form then write data to db and redirect to users page.
router.post('/create', function(req, res) {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
})

// Show user info by render from view page.
router.get('/:id', function(req, res) {
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/view', {
    user: user
  });
});

// Remove user via id then redirect to user page.
router.get('/remove/:id', function(req, res) {
  var id = req.params.id;
  var user = db.get('users').remove({id: id}).write();
  res.redirect('/users');
});

module.exports = router;
