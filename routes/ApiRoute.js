const express = require('express');
const { RegisterController, LoginController } = require('../controller/AuthController');
const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);
router.post('/logout');
router.post('/user/update');
router.post('/user/delete');
router.post('/album/create');
router.post('/file/upload');

module.exports = router;
