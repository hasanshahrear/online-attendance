// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const isHolidayCheck = new Schema({
    holyDay : {
        type: Boolean,
        default: false
    },
    remarks : {
        type: String,
    }
}, {timestamps: true})

const IsHolidayCheck = mongoose.model("IsHolidayCheck", isHolidayCheck)

module.exports = IsHolidayCheck