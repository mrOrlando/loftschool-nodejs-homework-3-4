const fs = require('fs');
const path = require('path');
const db = require('../models/db');
const validation = require('../libs/validation');

module.exports.get = async (ctx, next) => {
  if (ctx.session.isAdmin) {
    const data = {
      msgskill: ctx.flash('info')[0],
      msgfile: ctx.flash('form-info')[0],
      skillsYears: db.get('skills').value(),
    };

    ctx.render('pages/admin', data);
  } else {
    ctx.redirect('/login');
  }
};

module.exports.postSkills = async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;
  const errors = validation.skills({ age, concerts, cities, years });
  if (errors.length) {
    ctx.flash('info', errors.join('. '));
    ctx.redirect('/admin');
  } else {
    db.set('skills', { age, concerts, cities, years }).write();
    ctx.flash('info', 'Навыки обновлены');
    ctx.redirect('/admin');
  }
};

module.exports.postUpload = async (ctx, next) => {
  const { name: title, price } = ctx.request.body;
  const { name, size, path: filePath } = ctx.request.files.photo;

  const errors = validation.uploadFile({ name, size, title, price });
  if (errors.length) {
    fs.unlinkSync(filePath);
    ctx.flash('form-info', errors.join('. '));
    ctx.redirect('/admin');
  } else {
    const fileName = path.join(
      process.cwd(),
      'server',
      'public',
      'upload',
      name
    );
    fs.rename(filePath, fileName, err => {
      if (err) {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        ctx.flash('form-info', 'Возникла ошибка при обработке');
        ctx.redirect('/admin');
      } else {
        const dir = path.join('upload', name);
        db.defaults({ products: [] })
          .get('products')
          .push({ src: dir, name: title, price })
          .write();

        ctx.flash('form-info', 'Форма обработана');
        ctx.redirect('/admin');
      }
    });
  }
};
