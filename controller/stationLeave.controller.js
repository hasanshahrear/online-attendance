const StationLeave = require('../models/stationLeave.model')

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;
async function stationLeave(req, res){
    try{
        console.log(req.date)
        const isLeave = await StationLeave.findOne({id:req.user.id, end_time: null, createdAt:req.date})

        if(isLeave){
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "You are already on leave"
            })
        }else{
            const stationLeave = new StationLeave({
                user: req.user.id,
                reason: req.body.reason,
                start_time: req.body.start_time
            });       
            await stationLeave.save()
            res.status(HTTP_OK).json({
                success: true,
                message: "Station leave successful"
            })
        }
        
    }catch (error) {
        console.error('Error in Station Leave:', error);
    }
}

async function stationBack(req, res){
    try{
        const isLeave = await StationLeave.findOneAndUpdate(
            { user: req.user.id, end_time: null, createdAt:req.date }, 
            { end_time: req.body.end_time }, 
            { new: true } 
        );
        
        if (isLeave) {
            res.status(HTTP_OK).json({
                success: true,
                message: "Station back successful"
            });
        } else {
            res.status(HTTP_SERVER_ERROR).json({
                success: false,
                message: "You are not on leave"
            });
        }
         
    }catch (error) {
        console.error('Error in Station Leave:', error);
    }
}

module.exports ={
    stationLeave,
    stationBack
}