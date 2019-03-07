const db = require('../models/db');
const psw = require('../libs/password');

module.exports.get = async (ctx, next) => {
  if (ctx.session.isAdmin) {
    ctx.redirect('/admin');
  }

  ctx.render('pages/login', { msglogin: ctx.flash('info')[0] });
};

module.exports.post = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = db.getState().user;
  if (user.login === email && psw.validPassword(password)) {
    ctx.session.isAdmin = true;
    ctx.redirect('/admin');
  } else {
    ctx.flash('info', 'Неправильный логин или пароль');
    ctx.redirect('/login');
  }
};
