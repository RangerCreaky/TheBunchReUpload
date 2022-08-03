const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../modals/User');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// POST
// @route   POST api/users
// @desc    Register the user
// @access  public : First thing every new user does
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Please enter a password of minimum 6 length')
        .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Then there are some errors
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;
    try {
        // See if the user exists
        let user = await User.findOne({ email });

        if (user) {
            // User already exists
            return res.status(400).json({ errors: [{ msg: 'user already exists' }] });

        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: "mm"
        });

        user = new User({
            name,
            email,
            avatar,
            password,
        });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // return the jsonWebtoken
        const payload = {
            user: {
                id: user.id,
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

router.get('/', (req, res) => {
    res.send('Register user');
});

module.exports = router;