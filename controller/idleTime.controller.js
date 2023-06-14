const IdleTime = require('../models/idleTime.model')

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;
async function idleTime(req, res){
    // console.log(req.body.idle_time)
    try{
        const idleTime = new IdleTime({
            ...req.body,
        });       
        await idleTime.save()
        res.status(HTTP_OK).json({
            success: true,
            message: "Idle Time Updated successfully"
        })
    }catch (error) {
        console.error('Error in useCheckHoliday:', error);
    }
}

module.exports ={
    idleTime
}