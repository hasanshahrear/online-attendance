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
    
}, {timestamps: true})

const District = mongoose.model("District", districtSchema)

module.exports = District