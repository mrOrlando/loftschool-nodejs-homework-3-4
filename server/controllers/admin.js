const db = require('../models/db');

module.exports.get = function(req, res) {
  if (req.session.isAdmin) {
    const data = {
      msgskill: req.flash('info')[0],
      skillsYears: db.get('skills').value(),
    };

    res.render('pages/admin', data);
  } else {
    res.redirect('/login');
  }
};

module.exports.postSkills = function(req, res) {
  const { age, concerts, cities, years } = req.body;
  db.set('skills', { age, concerts, cities, years }).write();
  req.flash('info', 'Навыки обновлены');
  res.redirect('/admin');
};
