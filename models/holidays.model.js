// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const holidaysSchema = new Schema({
    holyDay : {
        type: Date,
        unique: true,
        required: true,
    }
    
}, {timestamps: true})

const Holidays = mongoose.model("Holidays", holidaysSchema)

module.exports = Holidays