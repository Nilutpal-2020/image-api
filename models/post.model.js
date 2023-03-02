const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true},
    address: {type: String, required: true},
    stay_info: {type: String, required: true},
    description: { type: String },
    image: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;