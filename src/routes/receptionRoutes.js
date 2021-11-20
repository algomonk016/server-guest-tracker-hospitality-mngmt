const express = require('express')
const router = express.Router()
const receptionController = require('../controllers/receptionController')
const ApiEndpoints = require('../utils/API/ApiEndpoints')

router.get(ApiEndpoints.room, receptionController.showRooms)
router.get(ApiEndpoints.customer+ApiEndpoints.new, receptionController.getCustomers)
router.get(ApiEndpoints.checkedOut, receptionController.getCheckedOutCustomers)
router.get(ApiEndpoints.feedback, receptionController.getFeedback)
router.post(ApiEndpoints.login, receptionController.login)
router.post(ApiEndpoints.customer, receptionController.addCustomer)

router.delete(ApiEndpoints.customer+"/:id/:intime/:room", receptionController.checkoutCustomer)

module.exports = router