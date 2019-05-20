var express = require('express'),
  app = express(),
  port = 3000;

app.get('/', function(request, response) {
  response.send('<h1>Hello</h1>');
});
app.get('/users', function(request, response) {
  response.send('<h1>User list</h1>');
});
app.listen(3000, function() {
  console.log('Server listening on port ' + port);
});
