const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController');
const api = require('../utils/API/ApiEndpoints')

router.post(api.login, customerController.login)
router.post(api.feedback, customerController.addFeedback)

module.exports = router