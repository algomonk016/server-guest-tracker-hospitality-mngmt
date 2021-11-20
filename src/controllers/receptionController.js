const db = require('../db/index')
const { stayedTime } = require('../utils/helper')
const message = require('../utils/message')

exports.login = async (req, res, next) => {
    try {
        const empId = req.body.empId
        const query = `SELECT * FROM EMPLOYEE WHERE EmpId=${empId}`
        db.query(query, (error, result) => {
            if (result) {
                res.send(result[0] ? { message: message.success, data: result[0] } : {message: message.noData})
            } else {
                res.send({ message: message.failed })
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
                        console.log(error)
                        res.send({ message: message.failed })
                    }
                })
            }
        })

    } catch (error) {
        console.log(error)
    }
}

exports.getCustomers = async (req, res, next) => {
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

exports.getCheckedOutCustomers = async (req, res, next) => {
    try{
        const query = 'SELECT * FROM CUSTOMER_LEAVE;'
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

exports.checkoutCustomer = async (req, res, next) => {
    try{
        const id = req?.params?.id
        const room = req?.params?.room
        const OutTime = new Date()
        let userDetails = []
        let price = 0
        await getRoomPrice(room, (result) => {
            price = result
        })
        
        // get customer details
        await getCustomer(id, 'CUSTOMER', async (Cust) => {
            Cust = Cust[0]
            const TimeStayed = stayedTime(Cust.InTime, OutTime)
            const Cost = price * Math.max(1, TimeStayed.totalHours)
            
            userDetails = [
                Cust.CustId,
                Cust.FirstName,
                Cust.LastName,
                Cust.Phone,
                Cust.Gender,
                Cust.Age,
                Cust.InTime,
                OutTime,
                Cost,
                Cust.IskeSaath,
                Cust.Room,
                Cust.AddressId
            ]
            
            console.log('user details', userDetails)

            // make the room vacant
            await updateRoom(userDetails[10], 1, (result) => {
                if (!result){
                    res.send({ message: message.failed })
                } else{
                    console.log('room vacant')
                }
            })

            // // delete the user from customer table
            await deleteCustomer(userDetails[0], (result) => {
                if (!result){
                    res.send({ message: message.failed })
                } else{
                    console.log('customer deleted')
                }
            })
    
            // // insert it into customer leave
            await addCustomerLeave(userDetails, (result)=>{
                if(result){
                    res.send({
                        message: message.success,
                        TimeStayed: TimeStayed,
                        Cost: Cost
                    })
                } else{
                    console.log('something went wrong')
                }
            })
        })
    } catch(error){

    }
}

exports.getFeedback = async (req, res, field) => {
    try{
        const query = "SELECT * FROM FEEDBACK";
        db.query(query, (error, result) => {
            res.send({message: message.success, data: result})
        })
    } catch(error) {
        res.send({message: message.failed})
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

const getCustomer = async(id, table, callback = () => {}) => {
    const query = 'SELECT * FROM ' + table + ' WHERE ' + (table === 'CUSTOMER' ? 'CustId':'EmpId') + ' = ' + id;
    console.log(query)

    db.query(query, (error, result, fields) => {
        callback(result)
    })
}

const deleteCustomer = async(id, callback = () => {}) => {
    const query = 'DELETE FROM CUSTOMER WHERE CustId = ' + id;
    console.log('customer delete', query)
    db.query(query, (error, result, fields) => {
        callback(result ? 1 : 0)
    })
}

const addCustomerLeave = async(details=[], callback = () => {}) => {
    const query = 'INSERT INTO CUSTOMER_LEAVE VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    console.log('customer leave', query)
    db.query(query, details, (error, result, fields) => {
        callback(result ? 1 : 0)
    })
}

const getRoomPrice = async(roomNo, callback = () => {}) => {
    const query = 'SELECT Cost FROM ROOM WHERE RoomNo='+roomNo;
    db.query(query, (error, result, fields) => {
        console.log('result', result)
        callback(result ? result[0].Cost : -1)
    })
}