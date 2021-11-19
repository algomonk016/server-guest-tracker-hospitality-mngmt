const db = require('../db/index')
const message = require('../utils/message')

exports.login = async (req, res, next) => {
    try {
        const empId = req.body.empId
        const query = `SELECT * FROM EMPLOYEE WHERE EmpId=${empId}`
        db.query(query, (error, result) => {
            if (result) {
                res.send({ message: message.success, data: result[0] })
            } else {
                res.send({ message: message.noData })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.showRooms = async (req, res, next) => {
    try {
        const query = "SELECT * FROM ROOM"
        db.query(query, (error, result) => {
            if (result) {
                res.send({ message: message.success, data: result })
            } else {
                res.send({ message: message.noData })
            }
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.addCustomer = async (req, res, next) => {
    try {
        const GeneralDetails = req.body.generalDetails
        const Address = req.body.address
        const WithHim = req.body.withHim.toString()
        const RoomSelected = req.body.roomSelected
        let AddressId = null
        const InTime = new Date()

        await newAddress(Address, (response) => {
            AddressId = response;
        })

        await updateRoom(RoomSelected, 0, (response) => {
            const DatasArray = [
                GeneralDetails.FirstName,
                GeneralDetails.LastName,
                GeneralDetails.ContactNo,
                GeneralDetails.Gender,
                GeneralDetails.Age,
                InTime,
                WithHim,
                RoomSelected,
                AddressId
            ]

            if (response) {
                const query = `INSERT INTO CUSTOMER (FirstName, LastName, Phone, Gender, Age, InTime, IskeSaath, Room, AddressId) VALUES (?,?,?,?,?,?,?,?,?);`
                db.query(query, DatasArray, (error, result) => {
                    if (result) {
                        res.send({ message: message.success, data: result })
                    } else {
                        res.send({ message: message.failed })
                    }
                })
            }

        })

    } catch (error) {
        console.log(error)
    }
}

exports.getCustomer = async (req, res, next) => {
    try{
        const query = 'SELECT * FROM CUSTOMER;'
        db.query(query, (error, result)=>{
            if (result) {
                res.send({ message: message.success, data: result })
            } else {
                res.send({ message: message.noData })
            }
        })
    } catch(error){
        console.log(error)
    }
}

const newAddress = async (address, callback = () => { }) => {
    const query = `INSERT INTO ADDRESS (Street, Landmark, City, State, Pin) VALUES (?, ?, ?, ?, ?);`
    const AddressArray = [address.Street, address.Landmark, address.City, address.State, address.Pincode]

    db.query(query, AddressArray, (error, result, field) => {
        callback(result ? result.insertId : -1)
    })
}

const updateRoom = async (room, status, callback = () => { }) => {
    const query = `UPDATE ROOM SET IsOccupied=${status ? 0 : 1} WHERE RoomNo=${room}`

    db.query(query, (error, result, fields) => {
        callback(result ? 1 : 0)
    })
}