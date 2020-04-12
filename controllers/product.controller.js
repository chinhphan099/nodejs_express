var Product = require('../models/product.model');
var User = require('../models/user.model');
module.exports.index = async (req, res, next) => {
  try {
    var page = parseInt(req.query.page) || 1;
    var perPage = 3;
    var start = (page - 1) * perPage;
    var end = page * perPage;

    var products = await Product.find();
    var fbId = !!req.signedCookies.fbId ? req.signedCookies.fbId : '';
    var user = await User.findOne({'fbId': fbId});
    res.render('product/index', {
      products: products.slice(start, end),
      name: !!user && !!user.name ? user.name : ''
    });
  }
  catch(error) {
    next(error);
  }
};
