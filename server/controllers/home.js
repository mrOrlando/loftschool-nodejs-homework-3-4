const nodemailer = require('nodemailer');
const config = require('../config.json');
const db = require('../models/db');

module.exports.get = function(req, res) {
  const data = {
    skillsYears: db.get('skills').value(),
    products: db.get('products').value(),
    msgemail: req.flash('info')[0],
  };

  res.render('pages/index', data);
};

module.exports.post = function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.message) {
    req.flash('info', 'Нужно заполнить все поля!');
    res.redirect('/');
  }

  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`,
  };

  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      req.flash('info', 'При отправке письма произошла ошибка!');
      res.redirect('/');
    }

    req.flash('info', 'Письмо успешно отправлено!');
    res.redirect('/');
  });
};
