const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

router.post('/login', customerController.login)
router.get('/', customerController.getSomething)

module.exports = router