/*
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
*/

var Product = require('../models/product.model');
module.exports.index = async (req, res, next) => {
  try {
    var page = parseInt(req.query.page) || 1;
    var perPage = 3;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    var products = await Product.find();
    res.render('product/index', {
      products: products.slice(start, end)
    });
  }
  catch(error) {
    next(error);
  }
};
