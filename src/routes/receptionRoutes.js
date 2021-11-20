const express = require('express')
const router = express.Router()
const receptionController = require('../controllers/receptionController')
const ApiEndpoints = require('../utils/API/ApiEndpoints')

router.post(ApiEndpoints.login, receptionController.login)
router.post(ApiEndpoints.customer, receptionController.addCustomer)
router.get(ApiEndpoints.customer+ApiEndpoints.new, receptionController.getCustomers)
router.delete(ApiEndpoints.customer+"/:id/:intime/:room", receptionController.checkoutCustomer)
router.get(ApiEndpoints.room, receptionController.showRooms)

module.exports = router