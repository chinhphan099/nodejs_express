var db = require('../db');

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 3;
  var start = (page - 1) * perPage;
  var end = page * perPage;

  // use drop, take of lodash, lowdb baseon lodash
  var drop = (page - 1) * perPage;
  res.render('product/index', {
    //products: db.get('products').value().slice(start, end)
    products: db.get('products').drop(drop).take(perPage).value()
  });
};
