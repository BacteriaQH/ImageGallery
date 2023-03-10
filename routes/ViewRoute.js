const express = require('express');
const router = express.Router();

const { getRegister, getLogin, getMainPage, getUserPage } = require('../controller/ViewController');
router.get('/', getMainPage);
router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('^/user/:userId(@+[a-z0-9]{32})', getUserPage);
router.get('create/album');

router.get('/admin/login');
router.get('/admin/dashboard');
router.get('/admin/users');
router.get('/admin/images');

module.exports = router;
