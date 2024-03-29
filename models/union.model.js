// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const unionSchema = new Schema({
    district_id : {
        type : Schema.Types.ObjectId,
        ref: 'District',
        required: true,
    },
    sub_district_id : {
        type : Schema.Types.ObjectId,
        ref: 'SubDistrict',
        required: true,
    },
    union_name : {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    
}, {timestamps: true})

const Union = mongoose.model("Union", unionSchema)

module.exports = Union