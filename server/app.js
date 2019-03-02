const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const app = express();

// view engine setup
app.set('views', './server/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

app.use(
  session({
    secret: 'loftschool',
    key: 'sessionkey',
    cookie: { path: '/', httpOnly: true, magAge: 6000 },
    saveUninitalized: false,
    resave: false,
  })
);

app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
