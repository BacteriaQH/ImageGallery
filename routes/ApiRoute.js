const express = require('express');
const { RegisterController, LoginController } = require('../controller/AuthController');
const { CreateFolderController, UploadFileController, DeleteFileController } = require('../controller/FileController');
const router = express.Router();

router.post('/register', RegisterController);
router.post('/login', LoginController);
router.post('/logout');
router.post('/user/update');
router.post('/user/delete');
router.post('/album/create');
router.post('/file/upload', UploadFileController);
router.post('/file/delete', DeleteFileController);
router.post('/folder/create', CreateFolderController);

module.exports = router;
