const express = require('express');
const router = express.Router();
//internal imports
const { getInbox } = require('../controllers/inboxController');

router.get('/', getInbox);

module.exports = router;
