const express = require('express');
const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MSG = require('../constant/message');
const ERROR = require('../constant/error');
const CONSTANT = require('../constant');
const jwt = require('jsonwebtoken');

const db = require('../database');

router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

function findUserByUserNameField(field, value) {
    return db.tables.User.findOne({
        where: {
            [field]: value
        }
    })
}

function createNewUser(userData) {
    const salt = bcrypt.genSaltSync(CONSTANT.SALT);
    const hash = bcrypt.hashSync(userData.password, 12)

    return db.tables.User.create({
        userid: uuid(),
        [CONSTANT.USERNAME_FIELD]: userData[CONSTANT.USERNAME_FIELD],
        password: hash,
    })
}

//************ LOCAL STRATEGY ******************

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: CONSTANT.USERNAME_FIELD,
        passwordField: CONSTANT.PASSWORD_FIELD,
        session: true
    },
    function (username, password, done) {
        findUserByUserNameField(CONSTANT.USERNAME_FIELD, username).then(user => {
            if (!user) {
                return done(null, false, {
                    message: ERROR.WRONG_USERNAME
                });
            } else if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {
                    message: ERROR.WRONG_PASSWORD
                });
            }

            return done(null, {
                id: user.userid,
                email: user.email,
                user_name: user.username,
                avatar: user.avatar
            })
        })
    }
));

/**
 * 
 * @api {post} /api/user/register Register
 * @apiName register
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} email Registration email
 * @apiParam  {String} password Registration password
 * 
 * @apiSuccess (200) {type} message A success message
 * 
 * @apiParamExample  {type} Body Request Example:
   {
       email : 'youremail@example.com',
       password: 'yourblankpassword'
   }
 * 
 * 
 * @apiSuccessExample {type} Body Success Response:
   {
       message: 'Register success!'
   }
 * 
 * 
 */
router.post('/register', (req, res) => {
    const userData = req.body;
    if (!userData.hasOwnProperty(CONSTANT.USERNAME_FIELD) || !userData.hasOwnProperty(CONSTANT.PASSWORD_FIELD)) {
        res.status(400).send(ERROR.INVALID_REGISTRATION)
    }

    db.conn.sync().then(() => {
        findUserByUserNameField(CONSTANT.USERNAME_FIELD, userData[CONSTANT.USERNAME_FIELD]).then(user => {
            if (user) {
                res.status(400).send(ERROR.EXISTED_EMAIL)
            } else {
                createNewUser(userData).then((data) => {
                    res.status(200).send(MSG.SUCCESS_REGISTER);
                })
            }
        })
    })
});

/**
 * 
 * @api {post} /api/user/login Login
 * @apiName login
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} email Email
 * @apiParam  {String} password Password
 * 
 * @apiSuccess (200) {Object} data An user data payload
 * @apiSuccess (200) {String} access_token Access token
 * @apiSuccess (200) {String} expires_in Token expire time
 * 
 * @apiParamExample  {Object} Body Request Example:
   {
       email : 'youremail@example.com',
       password: 'yourblankpassword'
   }
 * 
 * 
 * @apiSuccessExample {Object} Body Success Response:
   {
        data: {
            id: '8b6284b0-f11b-11e7-9417-ed874abe0164',
            email: 'youremail@example.com',
            user_name: 'Bobby',
            avatar: 'https://image.flaticon.com/icons/svg/149/149071.svg'
        },
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyMTU0MmUwLWYxM2QtMTFlN',
        expires_in: '8h'
   }
 * 
 * 
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send(info);
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            const expireTime = '8h'
            const token = jwt.sign(user,CONSTANT.SECRET_KEY,{
                expiresIn: expireTime
            })

            return res.status(200).send({data: user, access_token: token, expires_in: expireTime });
        });
    })(req, res, next);
});


/**
 * 
 * @api {get} /api/user/logout Logout
 * @apiName apiName
 * @apiGroup User
 * @apiVersion  1.0.0
 * 
 * 
 */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;