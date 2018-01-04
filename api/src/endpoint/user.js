const express = require('express');
const uuid = require('uuid/v1');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MSG = require('../constant/message');
const ERROR = require('../constant/error');
const CONSTANT = require('../constant');

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
                username: user.username,
                avatar: user.avatar
            })
        })
    }
));

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
            return res.status(200).send(user);
        });
    })(req, res, next);
});



// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(401).send(ERROR.unauthorized)
// }

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;