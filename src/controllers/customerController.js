const db = require('../db/index')
const message = require('../utils/message')

exports.login = async (req, res, next) => {
    try{
        const guestId = req.body.guestId
        const query = `SELECT * FROM CUSTOMER WHERE CustId=${guestId}`
        db.query(query, (error, result) => {
            if(result){
                res.send(result[0] ? { message: message.success, data: result[0] } : {message: message.noData})
            } else {
                res.send({message: message.failed})
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
                res.send({message: message.success, data: result})
            } else{
                res.send({message: message.failed})
            }
        })
    } catch(error){
        console.log(error)
    }
}