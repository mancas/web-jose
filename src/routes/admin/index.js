const express = require('express');
const router = express.Router();
const models = require('../../models/index').models;

/* GET dashboard. */
router.get('/', (req, res, next) => {
  res.render('admin/dashboard', { user: {name: 'Manu'} });
});

module.exports = router;
