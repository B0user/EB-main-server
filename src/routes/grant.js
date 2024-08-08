const express = require('express');
const router = express.Router();
const grantController = require('../controllers/grantController');

// Create a new grant
router.post('/', grantController.createGrant);

// Get all grants
router.get('/', grantController.getAllGrants);

// Get a grant by ID
router.get('/:id', grantController.getGrantById);

// Update a grant by ID
router.put('/:id', grantController.updateGrant);

// Delete a grant by ID
router.delete('/:id', grantController.deleteGrant);

module.exports = router;
