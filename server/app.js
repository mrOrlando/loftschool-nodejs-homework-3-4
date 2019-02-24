const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './server/views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.get('/admin', function(req, res) {
  res.render('pages/admin');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
