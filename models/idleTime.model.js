// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const idleTime = new Schema({
    idle_time : {
        type: Number,
    },
}, {timestamps: true})

const IdleTime = mongoose.model("IdleTime", idleTime)

module.exports = IdleTime