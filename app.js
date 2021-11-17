const express = require('express')
const cors = require('cors')

const customerRoutes = require('./src/routes/customerRoutes')
const receptionRoutes = require('./src/routes/receptionRoutes')
const AppError = require('./src/utils/AppError')

const app = express()
app.use(cors())

// routes
app.use('/api/v1/customer', customerRoutes)
app.use('/api/v1/reception', receptionRoutes)

// handle undefined routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route')
    next(err, req, res, next)
})

module.exports = app