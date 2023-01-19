// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const districtSchema = new Schema({
    division_id: {
        type : Schema.Types.ObjectId,
        ref: 'Division',
        required: true,
    },
    district_name : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    
}, {timestamps: true})

const District = mongoose.model("District", districtSchema)

module.exports = District