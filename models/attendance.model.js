// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const attendanceSchema = new Schema({
    user_id: {
        type : Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: { 
        type: String, 
        required: true, 
    },
    check_in: [{
        time: { type: String }
      }],
    check_out: [{
        time: { type: String }
      }],
    status: {
        type: String,
        required: true,
        trim: true,
    },
    remarks: {
        type: String,
        trim: true,
    },
}, {timestamps: true})

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance