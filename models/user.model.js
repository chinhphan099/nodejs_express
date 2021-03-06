var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  password: String,
  name: String,
  avt: String,
  fbId: String,
  accessToken: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;
