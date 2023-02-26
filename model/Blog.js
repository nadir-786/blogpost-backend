// mongoose model form blog with title description deleted and htmlContent

const mongoose = require("mongoose");

const Blog = mongoose.model(
    "Blog",
    new mongoose.Schema({
        title: String,
        description: String,
        deleted: Boolean,
        htmlContent: String
    })
);

module.exports = Blog;