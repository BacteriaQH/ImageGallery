const express = require('express');
const { AuthAdminController, ManageUserController } = require('../controller/AdminController');
const router = express.Router();

const { getRegister, getLogin, getMainPage, getUserPage } = require('../controller/ViewController');
router.get('/', getMainPage);
router.get('/login', getLogin);
router.get('/register', getRegister);
router.get('^/user/:userId(@+[a-z0-9]{32})', getUserPage);
router.get('create/album');

router.get('/admin/login', AuthAdminController.get);
router.post('/admin/login', AuthAdminController.post);
router.get('/admin/dashboard');
router.get('/admin/user', ManageUserController.getAll);
router.post('/admin/user/promote', ManageUserController.promote);
router.post('/admin/user/delete', ManageUserController.delete);
router.get('/admin/images');

module.exports = router;
