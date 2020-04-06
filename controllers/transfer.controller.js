var shortId = require('shortId');
var db = require('../db');

module.exports.create = function(req, res, next) {
  res.render('transfer/create', {
    csrfToken: req.csrfToken()
  });
};

module.exports.postCreate = function(req, res, next) {
  var data = {
    id: shortId.generate(),
    accountId: req.body.accountId,
    userId: req.signedCookies.userId,
    amount: parseInt(req.body.amount)
  };
  db.get('transfer').push(data).write();
  res.redirect('/transfer/create');
};
