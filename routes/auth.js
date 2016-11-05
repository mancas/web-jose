'use strict';

const express = require('express');
const router = express.Router();

const models = require('../src/models').models;
const User = models.User;

const logoutUser = function (req, res, next) {
  req.session && req.session.destroy();
  next()
};

module.exports = (passport) => {
  router.get('/login', logoutUser, (req, res) => {
    res.render('admin/pages/login');
  });

  router.post('/login', (req, res) => {
    console.info('here');
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('DB error');
        return res.render('admin/pages/login', { error: 'Hubo un error interno' });
      }

      if (!user) {
        console.error('Not valid user');
        return res.render('admin/pages/login', { error: 'Las credenciales de acceso no son correctas. Comprueba el usuario y la contraseña.' });
      }

      res.redirect('/');
    })(req, res);

    /*passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    });*/
  });

  router.get('/logout', (req, res) => {
    req.session && req.session.destroy();

    return res.redirect('/');
  });

  return router;
};
