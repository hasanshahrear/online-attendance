// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const stationLeaveSchema = new Schema({
    reason : {
        type : String,
        required: true,
        trim: true,
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
    
}, {timestamps: true})

const StationLeave = mongoose.model("StationLeave", stationLeaveSchema)

module.exports = StationLeave