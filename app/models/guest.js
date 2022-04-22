const mongoose = require('mongoose')
const HappyHour = require('./happy-hour')

const { Schema } = mongoose

const guestSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		city: {
			type: String,
			required: true
		},
		favorites: [{type: Schema.Types.ObjectId, ref: 'HappyHour'}],
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
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

module.exports = mongoose.model('Guest', guestSchema)
