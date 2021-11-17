const mysql = require('mysql')
const config = require('../../config')

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

module.exports = connection;