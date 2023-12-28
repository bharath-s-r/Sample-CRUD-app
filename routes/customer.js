const express = require('express');

const customerController = require('../controllers/customer');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /dashboard/customer
router.post('/customer', isAuth, customerController.getCustomerInfo);



module.exports = router;