const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getAllItems, 
  createItem, 
  updateItemStatus, 
  deleteItem 
} = require('../controllers/lostController');

router.get('/', getAllItems);
router.post('/', auth, createItem);
router.put('/:id', auth, updateItemStatus);
router.delete('/:id', auth, deleteItem);

module.exports = router;
