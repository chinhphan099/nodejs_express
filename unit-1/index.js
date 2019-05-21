var express = require('express'),
  app = express(),
  port = 3000,
  users = [
    {id: 1, name: 'Chinh'},
    {id: 2, name: 'Yen'}
  ];
app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(3000, function() {
  console.log('Server listening on port ' + port);
});
