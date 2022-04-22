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

// INDEX
//get all happy hours
router.get('/happy-hours', requireToken, (req, res, next)=>{
    HappyHour.find()
    .populate('owner')
        .then(happyHours => {
            return happyHours.map(happyHour => happyHour.toObject())
        })
        .then(happyHours => {
            res.status(200).json({happyHours: happyHours})
        })
        .catch(next)

})


// INDEX
// get all happy hours in a city with a specific tag
router.get('/happy-hours/index/:city/:tag', requireToken, (req, res, next)=>{
    HappyHour.find({city : `${req.params.city}`, "tags.tag": `${req.params.tag}`})
        .then(handle404)
        .then(happyHours =>{
            console.log('city', req.params.city)
            console.log('tag', req.params.tag)
            console.log('the happy hours',happyHours)
            return happyHours
        })
        .then(happyHours => {
            return happyHours.map(happyHour => happyHour.toObject())
        })
        .then(happyHours => {
            res.status(200).json({happyHours: happyHours})
        })
        .catch(next)
})

//INDEX
// get all happy hours a city
router.get('/happy-hours/index/:city', requireToken, (req, res, next)=>{
    HappyHour.find({city: `${req.params.city}`})
    .populate('owner')
        .then(happyHours => {
            return happyHours.map(happyHour => happyHour.toObject())
        })
        .then(happyHours => {
            res.status(200).json({happyHours: happyHours})
        })
        .catch(next)
})


// SHOW
//GET /happy-hours/6262e33e498820d71d0ec27e
router.get('/happy-hours/:happyHourid', requireToken, (req, res, next)=> {
    id = req.params.happyHourid
    HappyHour.findById(id)
        .then(handle404)
        .then(happyHour =>{
            res.status(200).json({happyHour: happyHour.toObject()})
        })
        .catch(next)
})


// CREATE
//POST /happy-hours
router.post('/happy-hours', requireToken, (req, res, next)=>{
    req.body.happyHour.owner = req.user.id
    HappyHour.create(req.body.happyHour)
        .then(happyHour =>{
            res.status(201).json({happyHour: happyHour.toObject()})
        })
        .catch(next)
})

// UPDATE
//PATCH /happy-hours/6262e33e498820d71d0ec27e
router.patch('/happy-hours/:happyHourid', requireToken, (req, res, next)=> {
    id = req.params.happyHourid
    HappyHour.findById(id)
        .then(handle404)
        .then(happyHour => {
            requireOwnership(req, happyHour)
            return happyHour.updateOne(req.body.happyHour)
        })
        .then(happyHour => {
            res.sendStatus(204)
        })
        .catch(next)
})

// DELETE
// DELETE /happy-hours/6262e33e498820d71d0ec27e
router.delete('/happy-hours/:happyHourId', requireToken, (req, res, next)=>{
    id = req.params.happyHourId
    HappyHour.findById(id)
        .then(handle404)
        .then(happyHour =>{
            requireOwnership(req, happyHour)
            happyHour.deleteOne()
        })
        .then(()=>res.sendStatus(204))
})


module.exports = router