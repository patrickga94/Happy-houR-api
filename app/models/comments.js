/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('mongoose')
const {Schema} = mongoose


const commentSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = commentSchema