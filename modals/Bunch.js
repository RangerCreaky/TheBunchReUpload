const mongoose = require('mongoose');

const bunchSchema = new mongoose.Schema({
    bunchId: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    tag: {
        type: String
    },
    description: {
        type: String,
    },
    wallpaper: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        }
    }],
});

const Bunch = mongoose.model('bunch', bunchSchema);
module.exports = Bunch;