const express = require('express')
const passport = require('passport')

const HappyHour = require('../models/happy-hour')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', {session: false})

const removeBlanks = require('../../lib/remove_blank_fields')
const { handle } = require('express/lib/application')

const router = express.Router()

//ROUTES GO HERE

// CREATE
// POST /tags/<happy-hour_id>
router.post('/tags/:happyHourId', requireToken, (req, res, next)=>{
    const tag = req.body.tag
    const id = req.params.happyHourId
    HappyHour.findById(id)
        .then(handle404)
        .then(happyHour => {
            requireOwnership(req, happyHour)
            happyHour.tags.push(tag)
            return happyHour.save()
        })
        .then(happyHour => {
            res.status(201).json({happyHour: happyHour})
        })
        .catch(next)
})










module.exports = router