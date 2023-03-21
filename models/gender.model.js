// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const genderSchema = new Schema({
    gender_name : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    }
    
}, {timestamps: true})

const Gender = mongoose.model("Gender", genderSchema)

module.exports = Gender