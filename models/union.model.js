// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const unionSchema = new Schema({
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
    sub_district_id : {
        type : Schema.Types.ObjectId,
        ref: 'SubDistrict',
        required: true,
    },
    union_name : {
        type: String,
        required: true,
        trim: true,
    },
    
}, {timestamps: true})

const Union = mongoose.model("Union", unionSchema)

module.exports = Union