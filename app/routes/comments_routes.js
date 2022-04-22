// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const HappyHour = require('../models/happy-hour')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

///////////// ROUTES

// CREATE
// POST a comment route
router.post('/comments/:happyHourId', requireToken, (req, res, next)=>{
    req.body.comment.author = req.user.username
    req.body.comment.owner = req.user.id
    const comment = req.body.comment
    const id = req.params.happyHourId
    HappyHour.findById(id)
        .then(handle404)
        .then(happyHour => {
            happyHour.comments.push(comment)
            return happyHour.save()
        })
        .then(happyHour =>{
            res.status(201).json({happyHour: happyHour})
        })
        .catch(next)
})



module.exports = router