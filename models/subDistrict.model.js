// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const subDistrictSchema = new Schema({
    district_id : {
        type : Schema.Types.ObjectId,
        ref: 'District',
        required: true,
    },
    sub_district_name : {
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

const SubDistrict = mongoose.model("SubDistrict", subDistrictSchema)

module.exports = SubDistrict