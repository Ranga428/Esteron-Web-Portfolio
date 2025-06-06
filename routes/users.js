const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users
router.get('/', userController.getAllUsers);

// POST /users
router.post('/', userController.createUser);

module.exports = router;
