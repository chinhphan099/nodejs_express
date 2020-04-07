var db = require('../db');
var md5 = require('md5');
var Users = require('../models/user.model');
var user = {};

user.index = async (req, res) => {
  var users = await Users.find();
  res.render('users/index', {
    users: users
  });
};

user.search = async (req, res) => {
  var q = req.query.q;
  var matchedUser = await Users.find();
  matchedUser = matchedUser.filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUser,
    q: q
  })
};

user.create = (req, res) => {
  console.log(req.cookies);
  res.render('users/create');
};

user.postCreate = async (req, res) => {
  var newUser = new Users({
    email: req.body.email,
    phone: req.body.phone,
    password: md5(req.body.password),
    name: req.body.name,
    avt: req.file.path.split('/').slice(1).join('/')
  });
  try {
    await newUser.save();
  }
  catch (err) {
    console.log(err)
  }
  res.redirect('/users');
};

// Show info 1 user
user.getUser = async (req, res) => {
  var id = req.params.id;
  // var userDetails = db.get('users').find({id: id}).value();
  var userDetails = await Users.findOne({_id: id});

  res.render('users/view', {
    user: userDetails
  });
};

user.remove = async (req, res) => {
  var id = req.params.id;
  try {
    await Users.deleteOne({_id: id});
  }
  catch(e) {
    console.log(e);
  }
  res.redirect('/users');
};

module.exports = user;
