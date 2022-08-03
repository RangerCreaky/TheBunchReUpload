const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../modals/User');
const Bunch = require('../../modals/Bunch');
const Profile = require('../../modals/Profile');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuidv4 } = require('uuid');
const auth = require('../../middleware/auth');
const inBunch = require('../../middleware/bunch');

// once a user is logged in he can do the following
// Join a bunch
// enter into already joined bunches

router.get("/", [auth, inBunch], async (req, res) => {
    try {
        const bunch = await Bunch.findOne({ _id: req.bunch.id });
        if (!bunch) {
            return res.status(400).json({ msg: 'No bunch available' });
        }
        res.json(bunch);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

// create a bunch

// @route   POST api/bunch/create
// @desc    Create a bunch
// @access  Only logged in user can create a bunch
router.post("/create", [auth, [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('secret', 'secret should be of minimum 12 characters')
        .isLength({ min: 12 })
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Then there are some errors
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, secret } = req.body;
    try {
        // generate a new uuid
        let user = await User.findOne({ _id: req.user.id });
        let profile = await Profile.findOne({ user: req.user.id });

        if (!user) {
            return res.status(400).json({ msg: 'please login' });
        }
        const bunchId = uuidv4();

        const bunch = new Bunch({
            name,
            bunchId,
            secret,
            users: [
                {
                    user: req.user.id,
                    name: user.name,
                    avatar: user.avatar
                }
            ],
        });

        // hash the secret & save the bunch
        const salt = await bcrypt.genSalt(10);
        bunch.secret = await bcrypt.hash(secret, salt);
        await bunch.save();

        user.bunches.unshift({
            name: name,
            bunchId: bunchId,
            bunch: bunch.id
        })


        if (profile) {
            // If the User already created a profile then push this bunch in his profile
            profile.bunches.unshift({
                bunch: bunch.id
            });

            profile.save();
        }

        await user.save();
        // generate a payload
        const payload = {
            user: {
                id: user.id,
            },
            bunch: {
                id: bunch.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


router.post("/join", [auth, [
    check('bunchId', 'bunch id is required')
        .exists(),
    check('secret', 'A secret is required to join a Bunch')
        .exists()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Then there are some errors
        return res.status(400).json({ errors: errors.array() })
    }

    const { bunchId, secret } = req.body;
    console.log(bunchId, secret);
    try {
        const bunch = await Bunch.findOne({ bunchId });
        const user = await User.findOne({ _id: req.user.id });
        const profile = await Profile.findOne({ user: req.user.id });

        if (!bunch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Bunch credentials' }] });
        }

        const isMatch = await bcrypt.compare(secret, bunch.secret);
        if (!isMatch) {
            console.log('didn;t match');
            return res.status(400).json({ errors: [{ msg: 'Invalid Bunch credentials' }] });
        }

        // check if the user already joined that bunch or not
        // Check in the user.bunches modal if the current bunch id is present
        const alreadyJoined = user.bunches.filter((element) => {
            return element.bunch.toString() === bunch.id.toString();
        }).length > 0;

        if (!alreadyJoined) {
            // User didnt join the bunch yet
            // Then add this user to bunch
            bunch.users.unshift({
                user: req.user.id,
                name: user.name,
                avatar: user.avatar
            });

            // Add this bunch to the user
            user.bunches.unshift({
                bunch: bunch.id,
                name: bunch.name,
                bunchId: bunch.bunchId
            });

            if (profile) {
                profile?.bunches.unshift({
                    bunch: bunch.id
                });

                profile.save();
            }

            await user.save();
            await bunch.save();
        }

        // return the jsonWebtoken
        const payload = {
            user: {
                id: req.user.id
            },
            bunch: {
                id: bunch.id
            }
        }


        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                return res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


router.post('/edit', [auth, inBunch], async (req, res) => {
    try {
        const { name, tag, description } = req.body;
        const newBunchDetails = {};
        if (name) newBunchDetails.name = name;
        if (tag) newBunchDetails.tag = tag;
        if (description) newBunchDetails.description = description;

        const bunch = await Bunch.findOneAndUpdate({ _id: req.bunch.id },
            { $set: newBunchDetails },
            { new: true });

        return res.json(bunch);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

router.delete("/exit", [auth, inBunch], async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.user.id });
        const bunch = await Bunch.findOne({ _id: req.bunch.id });
        const profile = await Profile.findOne({ user: req.user.id });

        // Remove user from bunch.users
        bunch.users = bunch.users.filter((element) => {
            return element.user.toString() !== req.user.id;
        });

        user.bunches = user.bunches.filter((element) => {
            return element.bunch.toString() !== req.bunch.id;
        });

        await user.save();


        if (profile) {
            profile.bunches = profile.bunches.filter((element) => {
                return element.bunch.toString() !== req.bunch.id;
            });

            await profile.save();
        }
        if (bunch.users.length === 0) {
            await Bunch.deleteOne({ _id: req.bunch.id });
        }
        else {
            await bunch.save();
        }


        // If the bunch becomes empty
        // Then delete that bunch

        // again generate a new payload and send as response as now 
        // the payload should have the user only and no bunch id
        // Handle this token in the front end.
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

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;