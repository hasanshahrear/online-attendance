// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const districtSchema = new Schema({
    district_name : {
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

const District = mongoose.model("District", districtSchema)

module.exports = District