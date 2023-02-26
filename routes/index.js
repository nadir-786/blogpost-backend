
const express = require('express');
const router = express.Router();
const Blog = require('../model/Blog');



// route for creating blogs
router.post('/createBlog', (req, res) => {
    // Create a Blog
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        htmlContent: req.body.htmlContent,
    });
    // Save Blog in the database
    blog.save(blog)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Blog."
            });
        });
});
// route for getting all blogs
router.get('/blogs', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.json({
                data: blogs,
                success: true,
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving blogs."
            });
        });
}
);

// route for getting a blog by id
router.get('/blog/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (!blog) {
                return res.status(404).send({
                    message: "Blog not found with id " + req.params.id
                });
            }
            res.json({
                data: blog,
                success: true,
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Blog not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving blog with id " + req.params.id
            });
        });
}
);

module.exports = router;
