const jwt = require('jsonwebtoken');
const CONSTANT = require('../constant')
const ERROR = require('../constant/error')

function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token,CONSTANT.SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: ERROR.FAILED_TO_AUTHENTICATE_TOKEN
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: ERROR.NO_TOKEN_PROVIDE
        });

    }
}

module.exports = verifyToken;