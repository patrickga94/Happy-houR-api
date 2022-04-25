const mongoose = require('mongoose')
const commentSchema = require('./comments')
const tagSchema = require('./tags')
const User = require('./users')
const { Schema } = mongoose

const happyHourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
		},
        city: {
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
        hours: [{type: Number, maxlength: 2, required: true}],
        comments: [commentSchema],
        tags: [tagSchema]

	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)

module.exports = mongoose.model('HappyHour', happyHourSchema)