const express = require('express');
const router = express.Router();
//internal imports
const loginController = require('../controllers/loginController');

const { getLogin } = require('../controllers/loginController');

router.get('/', getLogin);

module.exports = router;
