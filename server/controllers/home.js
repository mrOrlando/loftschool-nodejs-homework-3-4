const nodemailer = require('nodemailer');
const config = require('../config.json');
const db = require('../models/db');

module.exports.get = async (ctx, next) => {
  const data = {
    skillsYears: db.get('skills').value(),
    products: db.get('products').value(),
    msgemail: ctx.flash('info')[0],
  };

  ctx.render('pages/index', data);
};

module.exports.post = async (ctx, next) => {
  const { name, email, message } = ctx.request.body;
  if (!name || !email || !message) {
    ctx.flash('info', 'Нужно заполнить все поля!');
    ctx.redirect('/');
  }

  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`,
  };

  const sendMail = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error) {
      if (error) {
        reject('При отправке письма произошла ошибка!');
      }

      resolve('Письмо успешно отправлено!');
    });
  });

  try {
    const msg = await sendMail;
    ctx.flash('info', msg);
    ctx.redirect('/');
  } catch (error) {
    ctx.flash('info', error);
    ctx.redirect('/');
  }
};
