const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const inBunch = require('../../middleware/bunch');
const User = require('../../modals/User');
const Profile = require('../../modals/Profile');
const Post = require('../../modals/Post');

// @route   POST api/posts
// @desc    Make a post 
// @access  private : You need to be in a bunch to post something
//                    That post now belongs to the bunch
router.post('/', [auth, inBunch, [
    check('text', 'Some text is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // our POst Schema has some details from user object.
        // So we are bringing in the user
        const user = await User.findOne({ _id: req.user.id }).select('-password');

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
            bunch: req.bunch.id
        }
        const post = await new Post(newPost).save();
        res.json(post);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

// @route   GET api/post
// @desc    Get all posts
// @access  private : You can get all the posts in the current bunch only
router.get('/', [auth, inBunch], async (req, res) => {
    try {
        const posts = await Post.find({ bunch: req.bunch.id }).sort({ date: -1 });
        res.json(posts);
    }
    catch (err) {
        console.error(err);
        res.json(500).send('Server error');
    }
});

// @route   GET api/post/:id
// @desc    Get an individual post
// @access  private : An individual post can be found if that post is in the current bunch only
router.get('/:id', [auth, inBunch], async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, bunch: req.bunch.id });

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(200).json(post);
    }
    catch (err) {
        console.error(err);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/post/:id
// @desc    Delete an individual post
// @access  private : A user can delete any post that he made from any bunch
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (req.user.id !== post.user.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();
        res.json({ msg: 'post removed' });

    } catch (error) {
        console.error(error.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
});


// @route   PUT api/post/like/:id
// @desc    Like a post
// @access  private : You can like a post only if you are in a bunch in which the post was made
router.put('/like/:id', [auth, inBunch], async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, bunch: req.bunch.id });
        if (!post) {
            return res.status(404).json({ msg: 'Post doesnt exist' });
        }

        // Check if posts.likes has this users id
        // if this user id is present then then the user has already liked
        if (post.likes.filter(like => {
            return like.user.toString() === req.user.id
        }).length > 0) {
            // then the user has already liked it
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();

        res.status(200).json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/post/unlike/:id
// @desc    Like a post
// @access  private : You can like a post only if you are in a bunch in which the post was made
router.put('/unlike/:id', [auth, inBunch], async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, bunch: req.bunch.id });

        // Check if posts.likes has this users id
        // if this user id is present then then the user has already liked
        if (!post) {
            return res.status(404).json({ msg: 'Post doesnt exist' });
        }

        if (post.likes.filter(like => {
            return like.user.toString() === req.user.id
        }).length === 0) {
            // then the user has already liked it
            return res.status(400).json({ msg: 'Post has not been liked yet' });
        }

        const removeIndex = post.likes.map((like) => {
            return like.user.toString();
        }).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.status(200).json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/post/comment/:id
// @desc    Comment on a post
// @access  private : You can comment on a post only if you are in the same bunch
router.post('/comment/:id', [auth, inBunch, [
    check('text', 'Some text is required')
        .not()
        .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // our POst Schema has some details from user object.
        // So we are bringing in the user
        const user = await User.findOne({ _id: req.user.id }).select('-password');
        const post = await Post.findOne({ _id: req.params.id, bunch: req.bunch.id });

        if (!post) {
            // Then user is nt authorized to comment on that post
            return res.status(401).json({ msg: 'You are not authorized' });
        }

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

// @route   Delete api/post/comment/:postid/:commentid
// @desc    Delete a Comment on a post
// @access  private : If you have already made a post, then you are allowed to delete it
router.delete('/comment/:postid/:commentid', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.postid });
        // Check if post exists
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }


        const comment = post.comments.find((comment) => {
            return comment._id.toString() === req.params.commentid;
        });

        // Check if comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        // Check if that comment is made by the current user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const removeIndex = post.comments.map((comment) => {
            return comment.user.toString();
        }).indexOf(req.user.id);


        post.comments.splice(removeIndex, 1);

        await post.save();

        res.status(200).json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;