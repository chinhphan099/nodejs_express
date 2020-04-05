var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller');

// Render all users
router.get('/', productController.index);

module.exports = router;
