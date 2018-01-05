const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../database');
const express = require('express');

const CONSTANT = require('../constant');


//***************FACEBOOK STRATEGY**********************/
passport.use(new FacebookStrategy({
        clientID: CONSTANT.FB_APP_ID,
        clientSecret: CONSTANT.FB_APP_SECRET,
        callbackURL: "http://localhost:4040/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('ssss');
        // User.findOrCreate(..., function(err, user) {
        //   if (err) { return done(err); }
        //   done(null, user);
        // });
    }
));

const router = express.Router();


/**
 * 
 * @api {get} /api/auth/facebook Facebook
 * @apiName facebook
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * 
 * 
 * 
 * 
 * @apiSuccess (200) {type} name description
 * 
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
   {
       property : value
   }
 * 
 * 
 */
router.get('/facebook', passport.authenticate('facebook', {
    // scope: ['read_stream', 'publish_actions']
}))




module.exports = router;