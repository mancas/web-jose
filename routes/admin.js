var express = require('express');
var router = express.Router();
const models = require('../../models').models

/* GET dashboard. */
router.get('/', (req, res, next) => {
  res.render('admin/dashboard', { user: {name: 'Manu'} });
});

router.get('/users', (req, res, next) => {
  models.User.find({}, (err, users) => {
    if (err) {
      return next(err);
    }

    res.render('admin/pages/users/list', { users });
  });
});

router.get('/users/create', (req, res, next) => {
  res.render('admin/pages/users/form' );
});

router.post('/users/create', (req, res, next) => {
  const opts = {
    name: req.body.name,
    password: req.body.password,
    role: req.body.role
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

module.exports = router;
