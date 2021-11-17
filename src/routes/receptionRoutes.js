const express = require('express')
const router = express.Router()
const receptionController = require('../controllers/receptionController')

router.post('/login', receptionController.login)

module.exports = router