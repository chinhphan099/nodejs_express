require('dotenv').config();
var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  csurf = require('csurf');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL_PRODUCTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var userRoute = require('./routes/user.route'),
  authRoute = require('./routes/auth.route'),
  productRoute = require('./routes/product.route'),
  cartRoute = require('./routes/cart.route'),
  transferRoute = require('./routes/transfer.route'),
  app = express(),
  port = process.env.PORT || 3000;

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

app.set('view engine', 'pug');
app.set('views', './views'); // Set root view folder

// bodyParser use for req.body
app.use(cors());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csurf({cookie: true})); // add token when submit form transfer

// Index page // Render index page base on root view folder
app.get('/', (req, res) => {
  res.render('index', {
    name: 'Chinh'
  });
});

// User Routes // Define route for user
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', transferRoute);

// Public file in folder public
app.use(express.static('public'));

// Run localhost
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
