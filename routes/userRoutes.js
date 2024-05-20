// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/ecmuser/', userController.getAllUsers);
router.get('/projects/:id', userController.getProjectListForUser);


module.exports = router;
