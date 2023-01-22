// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const attendanceSchema = new Schema({
    user_id: {
        type : Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date_time : {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        trim: true,
    },
    remarks: {
        type: String,
        trim: true,
    },
}, {timestamps: true})

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance