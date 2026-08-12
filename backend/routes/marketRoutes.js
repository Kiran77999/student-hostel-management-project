const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', marketController.getAllItems);
router.get('/:id', marketController.getItemById);

// Protected routes
router.post('/', auth, marketController.createItem);
router.get('/my/listings', auth, marketController.getMyItems);
router.put('/:id', auth, marketController.updateItem);
router.delete('/:id', auth, marketController.deleteItem);

module.exports = router;
