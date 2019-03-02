module.exports.get = function(req, res) {
  if (req.session.isAdmin) {
    res.render('pages/admin');
  } else {
    res.redirect('/login');
  }
};
