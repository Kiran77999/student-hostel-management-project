const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getAvailableElectives, 
  enrollInElective, 
  getMyElective 
} = require('../controllers/electiveController');

router.get('/available', auth, getAvailableElectives);
router.post('/enroll/:id', auth, enrollInElective);
router.get('/my', auth, getMyElective);

module.exports = router;
