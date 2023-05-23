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
        time: { type: String },
        distance: {type: String}
      }],
    check_out: [{
        time: { type: String },
        distance: {type: String}
      }],
    status: {
        type: Boolean,
        default: false,
    },
    remarks: {
        type: String,
        trim: true,
    },
    leave: {
        type: Boolean,
        default: false,
    },
    district: {
        type: String,
        trim: true,
    },
    upazila: {
        type: String,
        trim: true,
    },
    union: {
        type: String,
        trim: true,
    },
}, {timestamps: true})

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance