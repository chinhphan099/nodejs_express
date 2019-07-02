var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

// Render all users
router.get('/', userController.index);

// Get query string from form Search -> then Render by using index paget as template.
router.get('/search', userController.search);

// Create user page
router.get('/create', userController.create);

// Post data from create form then write data to db and redirect to users page.
router.post('/create', validate.postCreate, userController.postCreate);

// Show user info by render from view page.
router.get('/:id', userController.getUser);

// Remove user via id then redirect to user page.
router.get('/remove/:id', userController.remove);

module.exports = router;
