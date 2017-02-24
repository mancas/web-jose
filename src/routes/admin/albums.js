const express = require('express');
const router = express.Router();
const albumController = require('../../controllers/admin/albums');

router.get('/', albumController.list);

router.get('/create', albumController.create);

router.post('/create', albumController.processCreate);

router.get('/edit/:album_id', albumController.edit);

router.post('/edit/:album_id', albumController.processEdit);

module.exports = router;
