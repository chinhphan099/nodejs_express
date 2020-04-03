var db = require('../db');
var shortid = require('shortid');
var auth = {};

auth.login = (req, res) => {
  res.render('auth/login');
};

auth.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({email: email}).value();

  if(!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist.'
      ],
      values: req.body
    });
    return;
  }

  if(user.password !== password) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      values: req.body
    })
    return;
  }

  res.cookie('userId', user.id);
  res.redirect('/users');
};

module.exports = auth;
