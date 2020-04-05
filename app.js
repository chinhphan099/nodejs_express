require('dotenv').config();
var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route'), // import user route
  authRoute = require('./routes/auth.route'), // import auth route
  productRoute = require('./routes/product.route'), // import auth route
  app = express(),
  port = process.env.PORT || 3000;

var authMiddleWare = require('./middlewares/auth.middleware');
app.set('view engine', 'pug');
app.set('views', './views'); // Set root view folder

// bodyParser use for req.body
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

// Index page // Render index page base on root view folder
app.get('/', (req, res) => {
  res.render('index', {
    name: 'Chinh'
  });
});

// User Routes // Define route for user
app.use('/users', authMiddleWare.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);

// Public file in folder public
app.use(express.static('public'));

// Run localhost
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
