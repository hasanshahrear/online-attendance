// external imports
const jwt = require("jsonwebtoken")

// auth guard
const checkLogin = async (req, res, next)=>{
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // if req.user is equal to decoded
        req.user = decoded
        next()

        // console.log(decoded)
        // console.log(req.user)
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