const app = require('./app')

const connection = require('./src/db')
connection.connect((err)=>{
    if(err){
        console.log('error', err)
        return
    }
    console.log('connected')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});