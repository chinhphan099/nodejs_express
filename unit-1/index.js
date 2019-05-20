var express = require('express'),
  app = express(),
  port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
  res.render('index', {
    name: 'Chinh'
  });
});

app.get('/users', function(req, res) {
  res.render('users/index', {
    users: [
      {id: 1, name: 'Chinh'},
      {id: 2, name: 'Yen'}
    ]
  });
});

app.listen(3000, function() {
  console.log('Server listening on port ' + port);
});
