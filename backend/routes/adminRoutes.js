const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { 
  getAllStudents, 
  getAllElectives, 
  createElective, 
  updateElective, 
  deleteElective 
} = require('../controllers/adminController');

// All routes here are protected by both auth and admin middleware
router.use(auth, admin);

router.get('/students', getAllStudents);
router.get('/electives', getAllElectives);
router.post('/electives', createElective);
router.put('/electives/:id', updateElective);
router.delete('/electives/:id', deleteElective);

module.exports = router;
