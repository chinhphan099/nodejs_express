var express = require('express'),
  bodyParser = require('body-parser'),
  userRoute = require('./routes/user.route'),
  app = express(),
  port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

// bodyParser use for red.body
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

// Public file in folder public
app.use(express.static('public'));

// Index page
app.get('/', function(req, res) {
  res.render('index', {
    name: 'Chinh'
  });
});

app.use('/users', userRoute);

// Run localhost
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
