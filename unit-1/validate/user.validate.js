module.exports.postCreate = function(req, res, next) {
  var errors = [];

  if(!req.body.name) {
    errors.push('Empty name')
  }

  if(!req.body.phone) {
    errors.push('Empty phone')
  }

  if(errors.length) {
    res.render('users/create', {
      errors: errors,
      values: req.body
    })
    return;
  }

  next();
};
