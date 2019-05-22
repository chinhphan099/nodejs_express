var express = require('express'),
  app = express(),
  port = 3000,
  users = [
    {id: 1, name: 'Chinh'},
    {id: 2, name: 'Yen'}
  ],
  bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

// bodyParser use for red.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render('index', {
    name: 'Chinh'
  });
});

app.get('/users', function(req, res) {
  res.render('users/index', {
    users: users
  });
});

app.get('/users/search', function(req, res) {
  var q = req.query.q;
  var matchedUser = users.filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('users/index', {
    users: matchedUser,
    q: q
  })
});

app.get('/users/create', function(req, res) {
  res.render('users/create');
});

app.post('/users/create', function(req, res) {
  users.push(req.body);
  res.redirect('/users');
})

app.listen(3000, function() {
  console.log('Server listening on port ' + port);
});
