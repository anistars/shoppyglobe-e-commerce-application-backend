const express = require('express');
const router = express.Router();
const cartController = require('../controllers/userAuthController');

router.post('/register', cartController.registerUser);
router.post('/login', cartController.loginUser);

module.exports = router;