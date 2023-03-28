// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const weeklyHolidaysSchema = new Schema({
    day : {
        type: String,
        trim: true,
        unique: true,
    },
    isHoliday : {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

const WeeklyHolidays = mongoose.model("WeeklyHolidays", weeklyHolidaysSchema)

module.exports = WeeklyHolidays