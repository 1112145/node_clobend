const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../database');
const express = require('express');
const jwt = require('jsonwebtoken');

const CONSTANT = require('../constant');

const router = express.Router();

router.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//***************FACEBOOK STRATEGY**********************/
passport.use(new FacebookStrategy({
        clientID: CONSTANT.FB_APP_ID,
        clientSecret: CONSTANT.FB_APP_SECRET,
        callbackURL: CONSTANT.FB_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        db.conn.sync().then(() => {
            db.tables.User.findOrCreate({
                where: {
                    userid: 'FB' + profile.id
                },
                defaults: {
                    display_name: profile.displayName,
                    username: profile.username,
                    facebook_id: profile.id
                }
            }).then((users) => {
                done(null, {
                    id: users[0].userid,
                    email: users[0].email,
                    display_name: users[0].display_name,
                    facebook_id: users[0].facebook_id
                })
            })
        })
    }
));




/**
 * 
 * @api {get} /api/auth/facebook Facebook
 * @apiName facebook
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * 
 * 
 * 
 * @apiSuccessExample {type} Success:
   "Callback url: /api/auth/facebook/callback"
 * 
 * 
 */
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['publish_actions']
}));


router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', function (err, user, info) {
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            const expireTime = '8h'
            const token = jwt.sign(user, CONSTANT.SECRET_KEY, {
                expiresIn: expireTime
            })

            return res.status(200).send({
                data: user,
                access_token: token,
                expires_in: expireTime
            });
        });
    })(req, res, next);
});

//***************GOOGLE STRATEGY**********************/
passport.use(new GoogleStrategy({
        clientID: CONSTANT.GG_APP_ID,
        clientSecret: CONSTANT.GG_APP_SECRET,
        callbackURL: CONSTANT.GG_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        db.conn.sync().then(() => {
            db.tables.User.findOrCreate({
                where: {
                    userid: 'GG' + profile.id
                },
                defaults: {
                    display_name: profile.displayName,
                    username: profile.username,
                    facebook_id: profile.id
                }
            }).then((users) => {
                done(null, {
                    id: users[0].userid,
                    email: users[0].email,
                    display_name: users[0].display_name,
                    facebook_id: users[0].facebook_id
                })
            })
        })
    }
));

/**
 * 
 * @api {get} /api/auth/google Google
 * @apiName google
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * 
 * 
 * 
 * @apiSuccessExample {type} Success:
   "Callback url: /api/auth/google/callback"
 * 
 * 
 */

router.get('/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));


router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', function (err, user, info) {
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            const expireTime = '8h'
            const token = jwt.sign(user, CONSTANT.SECRET_KEY, {
                expiresIn: expireTime
            })

            return res.status(200).send({
                data: user,
                access_token: token,
                expires_in: expireTime
            });
        });
    })(req, res, next);
});

module.exports = router;