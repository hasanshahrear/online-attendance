const StationLeave = require('../models/stationLeave.model')

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;
async function stationLeave(req, res){
    try{
        const stationLeave = new StationLeave({
            ...req.body,
        });       
        await stationLeave.save()
        res.status(HTTP_OK).json({
            success: true,
            message: "Station leave successfully"
        })
    }catch (error) {
        console.error('Error in Station Leave:', error);
    }
}

module.exports ={
    stationLeave
}