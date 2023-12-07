const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    "name": {
        type: String,
    },
    "group": {
        type: String,
        required: true,
    },
    "photo": {
        type: String,
    },
    "mark": {
        type: Number,
    },
    "isDonePr": {
        type: Boolean,
        default: false, 
    },
})

module.exports = mongoose.model("Students", StudentSchema)