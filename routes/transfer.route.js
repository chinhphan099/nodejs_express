var express = require('express');
var router = express.Router();
var transferController = require('../controllers/transfer.controller');

// Render all users
router.get('/create', transferController.create);
router.post('/create', transferController.postCreate);

module.exports = router;
