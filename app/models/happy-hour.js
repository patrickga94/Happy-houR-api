const mongoose = require('mongoose')
const commentSchema = require('./comments')
const tagSchema = require('./tags')
const User = require('./users')
const { Schema } = mongoose

const happyHourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true,
		},
        city: {
            type: String,
            required: true
        },
		state: {
			type: String,
			required: true
		},
        deals: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        days: [{type: String, required: true}],
        startTime: {
			type: String,
			required: true
		},
		endTime: {
			type: String,
			required: true
		},
        comments: [commentSchema],
        tags: [tagSchema]

	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('HappyHour', happyHourSchema)