// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/ecmuser/', userController.getAllUsers);
router.get('/projects/:id', userController.getProjectListForUser);
router.post('/createNewUser', userController.createNewUserforECM);
router.post('/assignECMProject', userController.assignEcmProjectToUser);
router.delete('/deleteEcmUser/:id', userController.deleteUserFromECM);
router.put('/updateEcmUser', userController.updateEcmUser);
router.get('/allprojects/', userController.getAllProjects);


module.exports = router;
