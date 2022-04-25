// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const HappyHour = require('../models/happy-hour')
const User = require('../models/users')

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

// CREATE
// add a Happy Hour to a user's favorites
router.post('/favorites/:happyHourId', requireToken, (req, res, next)=>{
    id = req.params.happyHourId
    HappyHour.findById(id)
        .then(handle404)
        .then(happyHour => {
            req.user.favorites.push(happyHour)
            return req.user.save()
        })
        .then(()=>{
            User.findById(req.user._id)
                .populate('favorites')
                .then(user =>{
                    res.status(201).json({user: user})
                })

        })
        .catch(next)
})

// DELETE
// remove a Happy Hour from a user's favorites
router.delete('/favorites/:happyHourId', requireToken, (req, res, next)=>{
    id = req.params.happyHourId
    User.findById(req.user._id)
        .then(user =>{
           user.favorites.pull(id)
           return user.save()

        })
        .then(user =>{
            res.sendStatus(204)
        })
        .catch(next)
})


module.exports = router