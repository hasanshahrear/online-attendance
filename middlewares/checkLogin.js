// external imports
const jwt = require("jsonwebtoken")

// auth guard
const checkLogin = async (req, res, next)=>{
    try {
        console.log(req.user)
        const token = await req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // if req.user is equal to decoded
        req.user = decoded
        next()

    } catch (error) {
        console.log(error.message)
    }
    
}

module.exports ={
    checkLogin
}

// function(error, decoded){
//     if(decoded){
//         console.log({decoded})
//         console.log(decoded.email)
        
//         next()
//     }else{
//         console.log(error)
//     }

// }