const db = require('../models/db');
const psw = require('../libs/password');

module.exports.get = function(req, res) {
  res.render('pages/login', { msglogin: req.flash('info')[0] });
};

module.exports.post = function(req, res) {
  const { email, password } = req.body;
  const user = db.getState().user;
  if (user.login === email && psw.validPassword(password)) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    req.flash('info', 'Неправильный логин или пароль');
    res.redirect('/login');
  }
};
