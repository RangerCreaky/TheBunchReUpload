const jwt = require('jsonwebtoken');
const config = require('config');

const verify = (req, res, next) => {
    // Get the token from header
    const token = req.header('x-auth-token');
    if (!token) {
        // No token is present and the user is not verified
        next();
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        if (!decoded.bunch) {
            next();
        }
        else {
            req.bunch = decoded.bunch;
            req.user = decoded.user;
            next();
        }

    }
    catch (err) {
        res.status(401).json({ msg: "token is not valid" });
    }

}

module.exports = verify;