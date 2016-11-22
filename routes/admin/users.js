const express = require('express');
const router = express.Router();
const models = require('../../src/models/index').models;

router.get('/', (req, res, next) => {
  models.User.find({}, (err, users) => {
    if (err) {
      return next(err);
    }

    res.render('admin/pages/users/list', { users });
  });
});

router.get('/create', (req, res, next) => {
  res.render('admin/pages/users/form');
});

router.post('/create', (req, res, next) => {
  const password = req.body.password;
  const password_repeated = req.body.password_repeat;

  if (!password === password_repeated) {
    return res.render('admin/pages/users/form', {
      roles: models.User.getAvailableRoles(),
      sexValues: models.User.getSexValues(),
      message: 'Password do not match',
      error: true
    });
  }

  const opts = {
    name: req.body.username,
    password: password,
    role: req.body.role,
    sex: req.body.sex
  };

  models.User.signup(opts, (err, user) => {
    if (err) {
      console.error(err);
      return next({
        status: 500,
        error: err
      });
    }

    res.redirect(`/admin/users/edit/${user._id}`);
  });
});

router.get('/edit/:user_id', (req, res, next) => {
  models.User.findOne({ _id: req.params.user_id }, (err, user) => {
    if (err) {
      console.error(err);
      return next({
        status: 500,
        error: err
      });
    }

    res.render('admin/pages/users/form', {
      user,
      edition: true,
      roles: models.User.getAvailableRoles(),
      sexValues: models.User.getSexValues()
    });
  });
});

module.exports = router;
