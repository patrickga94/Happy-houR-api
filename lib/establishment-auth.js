// require authentication related packages
const passport = require('passport')
const bearer = require('passport-http-bearer')

// user model will be used to set `req.user` in
// authenticated routes
const Guest = require('../app/models/guest')
const Establishment = require('../app/models/establishment')

// this strategy will grab a bearer token from the HTTP headers and then
// run the callback with the found token as `token`

const strategyEstablishment = new bearer.Strategy(function (token, done) {
	// look for a user whose token matches the one from the header
	Establishment.findOne({ token: token }, function (err, user) {
		if (err) {
			return done(err)
		}
		// if we found a user, pass it along to the route files
		// if we didn't, `user` will be `null`
		return done(null, user, { scope: 'all' })
	})
})

// serialize and deserialize functions are used by passport under
// the hood to determine what `req.user` should be inside routes
passport.serializeUser((user, done) => {
	// we want access to the full Mongoose object that we got in the
	// strategy callback, so we just pass it along with no modifications
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

// register this strategy with passport
passport.use(strategyEstablishment)

// create a passport middleware based on all the above configuration
module.exports = passport.initialize()
