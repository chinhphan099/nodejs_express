var Product = require('../../models/user.model');

module.exports.postUser = async (req, res) => {
  res.cookie('fbId', req.body.fbId, {
    signed: true
  });
  var user = await Product.create(req.body);
  res.json(user);
};
