const jwt = require('jsonwebtoken');
const config = require('config');

const verify = (req, res, next) => {
    // Get the token from header
    const token = req.header('x-auth-token');
    if (!token) {
        // No token is present and the user is not verified
        return res.status(401).json({ msg: 'No token , Authorization denied' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;

        next();
    }
    catch (err) {
        res.status(401).json({ msg: "token is not valid" });
    }

}

module.exports = verify;