const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require('../../modals/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    auth route to get the current user
// @access  private : No need to be in a bunch
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).select('-password');
        res.json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// @route   POST api/auth
// @desc    Login the user
// @access  public : No need to be in bunch
router.post('/', [
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Then there are some errors
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        // See if the user exists
        let user = await User.findOne({ email });

        if (!user) {
            // User doesnt exist.
            // So invalid credentials
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Passwords doesn't match
            // So invalid credentials
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // return the jsonWebtoken
        const payload = {
            user: {
                id: user.id
            }
        }


        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    }
    catch (err) {
        // any error here is a server error
        console.error(err.message);
        res.status(500).send('server error')
    }

    // No errors
});


module.exports = router;