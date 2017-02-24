const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/users');

router.get('/', userController.list);

router.get('/create', userController.create);

router.post('/create', userController.processCreate);

router.get('/edit/:user_id', userController.edit);

router.post('/edit/:user_id', userController.processEdit);

router.get('/remove/:user_id', userController.removeUser);

module.exports = router;
