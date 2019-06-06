var db = require('../db');
var shortid = require('shortid');
var user = {};

user.index = function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
};

user.search = function(req, res) {
  var q = req.query.q;
  var matchedUser = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUser,
    q: q
  })
};

user.create = function(req, res) {
  res.render('users/create');
};

user.postCreate = function(req, res) {
  req.body.id = shortid.generate(); // Create Random Key.
  db.get('users').push(req.body).write();
  res.redirect('/users');
};

user.get = function(req, res) {
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/view', {
    user: user
  });
};

user.remove = function(req, res) {
  var id = req.params.id;
  var user = db.get('users').remove({id: id}).write();
  res.redirect('/users');
};

module.exports = user;
