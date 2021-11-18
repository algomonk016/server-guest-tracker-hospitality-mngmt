const db = require('../db/index')

exports.login = async (req, res, next) => {
    try{
        const guestId = req.body.guestId
        const query = `SELECT * FROM CUSTOMER WHERE CustId=${guestId}`
        db.query(query, (error, result) => {
            if(result){
                res.send({message: 'success', data: result[0]})
            } else {
                res.send({message: 'No result found'})
            }
         })
    } catch(error){
        console.log(error)
    }
}

exports.addFeedback = async (req, res, next) => {
    try{
        const datas = req.body
        const datasArray = [datas.custId, datas.name, datas.roomNo, datas.rating, datas.message]
        const query = `INSERT INTO FEEDBACK (CustomerId, Name, RoomNo, Rating, Message) VALUES (?, ?, ?, ?, ?);`
        db.query(query, datasArray, (error, result, fields) => {
            if(result){
                res.send({message: 'success', data: result})
            } else{
                // console.log('failed', error.message)
                res.send({message: 'No'})
            }
        })
    } catch(error){
        console.log(error)
    }
}