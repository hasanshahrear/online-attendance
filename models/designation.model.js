// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const designationSchema = new Schema({
    designation_name : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    }
    
}, {timestamps: true})

const Designation = mongoose.model("Designation", designationSchema)

module.exports = Designation