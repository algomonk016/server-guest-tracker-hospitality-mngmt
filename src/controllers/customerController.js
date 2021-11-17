exports.login = async (req, res, next) => {
    try{
        // code to login
        console.log('were inside controller')
    } catch(error){
        console.log(error)
    }
}

exports.getSomething = async (req, res, next) => {
    try{
        console.log('we are get something')
    } catch(error){
        console.log('error')
    }
}