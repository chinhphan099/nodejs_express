var express = require('express'),
  app = express(),
  port = 3000,
  bodyParser = require('body-parser'),
  low = require('lowdb'),
  FileSync = require('lowdb/adapters/FileSync'),
  adapters = new FileSync('db.json'),
  shortid = require('shortid'),
  db = low(adapters);

db.defaults({users: []})
  .write();

app.set('view engine', 'pug');
app.set('views', './views');

// bodyParser use for red.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Index page
app.get('/', function(req, res) {
  res.render('index', {
    name: 'Chinh'
  });
});

// Render all users
app.get('/users', function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
});

// Get query string from form Search -> then Render by using index paget as template.
app.get('/users/search', function(req, res) {
  var q = req.query.q;
  var matchedUser = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUser,
    q: q
  })
});

// Create user page
app.get('/users/create', function(req, res) {
  res.render('users/create');
});
// Post data from create form then write data to db and redirect to users page.
app.post('/users/create', function(req, res) {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
})

// Show user info by render from view page.
app.get('/users/:id', function(req, res) {
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/view', {
    user: user
  });
});

// Remove user via id then redirect to user page.
app.get('/users/remove/:id', function(req, res) {
  var id = req.params.id;
  var user = db.get('users').remove({id: id}).write();
  res.redirect('/users');
});

// Run localhost
app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
