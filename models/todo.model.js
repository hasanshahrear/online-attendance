// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const todoSchema = new Schema({
    user: {
        type : Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true, 
        trim: true
    },
    text: {
        type: String,
        required: true, 
        trim: true
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
}, 
{
    timestamps: true
})
const Todo = mongoose.model("Todo", todoSchema)

module.exports= Todo

