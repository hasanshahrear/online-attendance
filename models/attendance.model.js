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
    inactive: [{
        time: { type: Date },
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
        type : Schema.Types.ObjectId,
        ref: "District"
    },
    upazila: {
        type : Schema.Types.ObjectId,
        ref: "Upazila"
    },
    union: {
        type : Schema.Types.ObjectId,
        ref: "Union"
    },
}, {timestamps: true})

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance