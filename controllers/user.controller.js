var db = require('../db');
var shortid = require('shortid');
var user = {};

user.index = (req, res) => {
  res.render('users/index', {
    users: db.get('users').value()
  });
};

user.search = (req, res) => {
  var q = req.query.q;
  var matchedUser = db.get('users').value().filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUser,
    q: q
  })
};

user.create = (req, res) => {
  res.render('users/create');
};

user.postCreate = (req, res) => {
  req.body.id = shortid.generate(); // Create Random Key.

  db.get('users').push(req.body).write();
  res.redirect('/users');
};

// Show info 1 user
user.getUser = (req, res) => {
  var id = req.params.id;
  var userDetails = db.get('users').find({id: id}).value();

  res.render('users/view', {
    user: userDetails
  });
};

user.remove = (req, res) => {
  var id = req.params.id;
  var user = db.get('users').remove({id: id}).write();
  res.redirect('/users');
};

module.exports = user;
