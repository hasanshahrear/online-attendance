// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const holidaysSchema = new Schema({
    year : {
        type: Number,
        trim: true,
    },
    month : [
        {
            name: {
                type: Number,
                unique: true
            },
            holiday: {
                type: Array
            }
        }
    ]
}, {timestamps: true})

const Holidays = mongoose.model("Holidays", holidaysSchema)

module.exports = Holidays