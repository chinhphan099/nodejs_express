var Product = require('../../models/product.model');
module.exports.index = async (req, res) => {
  var products = await Product.find();
  res.json(products);
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  var products = await Product.create(req.body);
  res.json(products);
};

module.exports.postUser = async (req, res) => {
  var products = await Product.create(req.body);
  res.json(products);
};
