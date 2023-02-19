// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const superAdminSchema = new Schema({
    first_name : {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    designation : {
        type: String,
        trim: true,
    },
    avatar: {
        type: String 
    },
    gender: {
        type: String,
        enum: ["male", "female", "unspecified"],
        default: "unspecified"
    },
}, {timestamps: true})

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema)

module.exports = SuperAdmin