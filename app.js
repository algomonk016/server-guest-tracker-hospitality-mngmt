const express = require('express')
const cors = require('cors')

const customerRoutes = require('./src/routes/customerRoutes')
const receptionRoutes = require('./src/routes/receptionRoutes')
const AppError = require('./src/utils/AppError')
const bp = require('body-parser')

const app = express()
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

const api = require('./src/utils/API/ApiEndpoints')

// routes
app.use( api.base + api.customer , customerRoutes)
app.use(api.base + api.reception, receptionRoutes)

// handle undefined routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route')
    next(err, req, res, next)
})

module.exports = app