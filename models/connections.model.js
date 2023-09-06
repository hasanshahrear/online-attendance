// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const connectionStatus = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: 'User',
    },
    connection_off_time: {
        type: Date,
    },
    connection_on_time: {
        type: Date,
    }
}, {timestamps: true})

const ConnectionStatus = mongoose.model("ConnectionStatus", connectionStatus)

module.exports = ConnectionStatus