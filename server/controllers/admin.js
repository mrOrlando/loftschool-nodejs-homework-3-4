const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const db = require('../models/db');
const validation = require('../libs/validation');

module.exports.get = function(req, res) {
  if (req.session.isAdmin) {
    const data = {
      msgskill: req.flash('info')[0],
      msgfile: req.flash('form-info')[0],
      skillsYears: db.get('skills').value(),
    };

    res.render('pages/admin', data);
  } else {
    res.redirect('/login');
  }
};

module.exports.postSkills = function(req, res) {
  const { age, concerts, cities, years } = req.body;
  const errors = validation.skills({ age, concerts, cities, years });

  if (errors.length) {
    req.flash('info', errors.join('. '));
    res.redirect('/admin');
  } else {
    db.set('skills', { age, concerts, cities, years }).write();
    req.flash('info', 'Навыки обновлены');
    res.redirect('/admin');
  }
};

module.exports.postUpload = function(req, res) {
  const form = new formidable.IncomingForm();
  const upload = path.join('./server', 'public', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function(err, fields, files) {
    if (err) {
      if (fs.existsSync(files.photo.path)) {
        fs.unlinkSync(files.photo.path);
      }
      req.flash('form-info', 'Возникла ошибка при обработке');
      res.redirect('/admin');
    }

    const { name: title, price } = fields;
    const { name, size } = files.photo;
    const errors = validation.uploadFile({ name, size, title, price });
    if (errors.length) {
      if (fs.existsSync(files.photo.path)) {
        fs.unlinkSync(files.photo.path);
      }
      req.flash('form-info', errors.join('. '));
      res.redirect('/admin');
    } else {
      const fileName = path.join(upload, files.photo.name);
      fs.renameSync(files.photo.path, fileName);
      // removes the server\\public a part of the path
      const dir = fileName.replace('server\\public', '');

      db.defaults({ products: [] })
        .get('products')
        .push({ src: dir, name: title, price })
        .write();

      req.flash('form-info', 'Форма обработана');
      res.redirect('/admin');
    }
  });
};
