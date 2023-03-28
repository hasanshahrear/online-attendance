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
        validate: {
            validator: function(email) {
              const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
              return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
          }
    },
    password: {
        type: String,
        required: true,
    },
    designation : {
        type: String,
        trim: true,
    },
    office_address : {
        type: String,
        trim: true,
    },
    avatar: {
        type: String 
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    district_id: {
        type : Schema.Types.ObjectId,
        ref: 'District',
    },
    sub_district_id: {
        type : Schema.Types.ObjectId,
        ref: 'SubDistrict',
    },
    union_id: {
        type : Schema.Types.ObjectId,
        ref: 'Union',
    },
    location: {
        type: Boolean,
        default: false,
    },
    office_location:{
        type: Object,
        default: null,
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User