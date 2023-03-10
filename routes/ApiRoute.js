const express = require('express');
const router = express.Router();

router.post('/register');
router.post('/login');
router.post('/logout');
router.post('/user/update');
router.post('/user/delete');
router.post('/album/create');
router.post('/file/upload');

module.exports = router;
