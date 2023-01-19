// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String 
    },
    gender: {
        type: String,
        enum: ["male", "female", "unspecified"],
        default: "unspecified"
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User