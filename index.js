const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'HostelManagement'
})

connection.connect((err)=>{
    if(err){
        console.log('error', err)
        return
    }
    

    const sql = "select * from temp"
    connection.query(sql, (err, result)=>{
        if(err) throw err
        console.log(result)
    })

    console.log('connected')
})

app.listen(3001, ()=>{
    console.log('Server is running')
})