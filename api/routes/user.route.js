var express = require('express');
var router = express.Router();
var productController = require('../controllers/user.controller');

router.post('/create', productController.postUser);

module.exports = router;
