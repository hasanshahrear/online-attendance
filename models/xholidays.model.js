// external imports
const mongoose = require("mongoose")

const {Schema} = mongoose

const holidaysSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    district : [
        new Schema({
            upazilla : [
                new Schema(
                    {
                        name: {
                            type: String,
                            trim: true,
                        },
                        union : [
                            new Schema(
                                {
                                    name : {
                                        type: String,
                                        trim: true,
                                    },
                                }
                            )
                        ]
                    }
                )
            ]
        }, {timestamps: true})
    ]
}, {timestamps: true})

const Holidays = mongoose.model("Holidays", holidaysSchema)

module.exports = Holidays