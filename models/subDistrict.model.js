// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const subDistrictSchema = new Schema({
    division_id: {
        type : Schema.Types.ObjectId,
        ref: 'Division',
        required: true,
    },
    district_id : {
        type : Schema.Types.ObjectId,
        ref: 'District',
        required: true,
    },
    sub_district_name : {
        type: String,
        required: true,
        trim: true,
    },
    
}, {timestamps: true})

const SubDistrict = mongoose.model("SubDistrict", subDistrictSchema)

module.exports = SubDistrict