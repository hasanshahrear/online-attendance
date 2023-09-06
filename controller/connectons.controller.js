const ConnectionStatus = require('../models/connections.model')

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

async function connectionStatus(req, res){
    try{
        const conStatus = new ConnectionStatus({
            ...req.body,
        });       
        await conStatus.save()
        res.status(HTTP_OK).json({
            success: true,
            message: "Connection Status Updated successfully"
        })
    }catch (error) {
        console.error('Error in useCheckHoliday:', error);
    }
}

module.exports ={
    connectionStatus
}