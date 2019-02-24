const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// view engine setup
app.set('views', './server/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/index'));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
