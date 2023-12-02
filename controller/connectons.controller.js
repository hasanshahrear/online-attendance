const ConnectionStatus = require('../models/connections.model')

// constants
const HTTP_OK = 200;
const HTTP_SERVER_ERROR = 500;

async function connectionStatus(req, res){
    const currentTime = new Date();
    const date = currentTime.toLocaleDateString('en-US', { timeZone: 'Asia/Dhaka' });
    console.log({date})

    try{
        const conStatus = new ConnectionStatus({
            user: req.user.id,
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