const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const inBunch = require('../../middleware/bunch');
const Profile = require('../../modals/Profile')
const User = require('../../modals/User');
const Post = require('../../modals/Post');
const Bunch = require('../../modals/Bunch');

const { check, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');
const { ObjectId } = require('mongodb');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  private : To get his profile, He doesn't need to be in a bunch
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ errors: "there is no profile for this user" });
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route   POST api/profile
// @desc    Create or update a user's profile
// @access  private : He doesn't need to be in a bunch to create a profile or update it
//                    After update in Schema, we add the bunches array from user schema to the profile schema
//                    while creating the profile.
router.post('/', [auth, [
    check('status', 'status is required')
        .not()
        .isEmpty(),
    check('skills', 'skills is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        instagram,
        linkedin,
        twitter
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }



    // Build Social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // if profile exists then update the profile
            profile = await Profile.findOneAndUpdate({ user: req.user.id },
                { $set: profileFields },
                { new: true });

            return res.json(profile);
        }

        // if profile doesn't exist then create the profile
        // if new profile is being created for the first time add the user in it
        const user = await User.findOne({ _id: req.user.id });
        profileFields.bunches = user.bunches;

        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route   GET api/profile
// @desc    Get all users profiles
// @access  private : A user can Find all the other user's profile of the current bunch only
//                  Show only the users of the bunch he is currently logged in
router.get('/', [auth, inBunch], async (req, res) => {
    // This gives all the users who have profiles only
    // Not all the users
    try {
        const id = ObjectId(req.bunch.id);
        const profiles = await Profile.find({ 'bunches.bunch': req.bunch.id }).populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});

// @route   GET api/profile/:user_id
// @desc    Get a pirticular users profiles
// @access  public
router.get('/:user_id', [auth, inBunch], async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id, 'bunches.bunch': req.bunch.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: "No such profile" });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        res.status(500).send('server error');
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private : You dont need to be in a bunch to add your profile
router.put('/experience', [auth, [
    check('title', 'title is required')
        .not()
        .isEmpty(),
    check('company', 'company is required')
        .not()
        .isEmpty(),
    check('from', 'from date is requires')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;


    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }

});


// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private : You dont need to be in a bunch to delete yor experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        const removeInd = profile.experience.map((element) => {
            return element.id;
        }).indexOf(req.params.exp_id);

        profile.experience.splice(removeInd, 1);

        await profile.save();
        res.status(200).json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
})



// @route   DELETE api/profile
// @desc    Delete a profile , user and posts
// @access  Private : You dont need to be in a bunch to delete youe account
//                    However you need to delete this userid from all bunches you were in
router.delete('/', auth, async (req, res) => {
    try {
        // @todo : Remoee user's posts -- done
        await Post.deleteMany({ user: req.user.id });

        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        await Bunch.updateMany({}, { $pull: { users: { user: req.user.id } } }, { new: true });


        res.json({ msg: "User deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }

});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private : No need to be in any bunch to update education
router.put('/education', [auth, [
    check('degree', 'Degree is required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
    check('from', 'from date is requires')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;


    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }

});

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete education from profile
// @access  Private no need to be in any bunch to delete education
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        const removeInd = profile.education.map((element) => {
            return element.id;
        }).indexOf(req.params.edu_id);

        profile.education.splice(removeInd, 1);

        await profile.save();
        res.status(200).json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// @route   PUT api/profile/github/:username
// @desc    Get user repos
// @access  Public :  Generic api call
router.get('/github/:username', async (req, res) => {
    try {
        const BaseURI = `https://api.github.com/users/${req.params.username}/repos`;
        const response = await axios.get(BaseURI, {
            params: {
                per_page: '5',
                sort: 'created:asc',
                client_id: `${config.get('githubClientId')}`,
                client_secret: `${config.get('githubSecret')}`
            },
            headers: {
                'user-agent': 'node.js'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).status('Server error');
    }
})


module.exports = router;