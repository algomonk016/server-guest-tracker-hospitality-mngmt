const connection = require('../db/index')

exports.login = async(req, res, next) => {
    try{
        // login code here
        const query = 'SELECT * FROM ROOM'
        connection.query(query, (error, result) => {
            if(error) throw error
            console.log('result', result)
        } )

    } catch(error){
        console.log(error)
    }
}