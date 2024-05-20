// userRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/ProjectController');

router.get('/', projectController.getAllusers);
router.get('/:id', projectController.getUserByName);
router.get('/OmsDetails', projectController.getOmsDetails);
// router.post('/', projectController.addUser);
// router.put('/:id', projectController.updateUser);
// router.delete('/:id', projectController.deleteUser);

module.exports = router;
