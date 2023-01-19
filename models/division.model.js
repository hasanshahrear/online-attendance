// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const divisionSchema = new Schema({
    division_name : {
        type: String,
        required: true,
        trim: true,
    },
    
}, {timestamps: true})

const Division = mongoose.model("Division", divisionSchema)

module.exports = Division