var express = require('express');
var router = express.Router();

/* GET dashboard. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', { user: {name: 'Manu'} });
});

module.exports = router;
