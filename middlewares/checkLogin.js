// external imports
const jwt = require("jsonwebtoken")

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

// auth guard
const checkLogin = async (req, res, next)=>{
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // if req.user is equal to decoded
        
        if(req.user = decoded){
            next()
        }else{
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "You're not authorized!!!",
            })
        }

    } catch (error) {
        console.log(error.message)
    }
}

// admin auth guard
const checkAdminLogin = async (req, res, next)=>{
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // if req.user is equal to decoded
        req.user = decoded
        if(decoded.admin){
            next()
        }else{
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "You're not an admin!!!",
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports ={
    checkLogin,
    checkAdminLogin
}
