const express = require('express');
const posts = require("./postDb");

const router = express.Router();


//////////////// GET ////////////////

router.get('/', (req, res) => {
  posts.find(options)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id', validatePostId(), (req, res) => {
	res.status(200).json(req.post)
});


//////////////// POST ////////////////
//This post request can be found in the userRouter.js

//////////////// PUT ////////////////

router.put('/:id', validatePostId(), (req, res) => {
  posts.update(req.params.id, req.body)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

//////////////// DELETE ////////////////

router.delete('/:id', validatePostId(), (req, res) => {
  posts.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({
        message: "The post you have selected has been deleted.",
      })
    } else {
      res.status(404).json({
        message: "The post you selected could not be found",
      })
    }
  })
  .catch((error) => {
    next(error)
  })
});


//////////////// CUSTOM MIDDLEWARE ////////////////

function validatePostId(req, res, next) {
  return (req, res, next) => {
		posts.getById(req.params.id)
			.then((post) => {
				if (post) {
					req.post = post
					next()
				} else {
					res.status(400).json({
						message: "Invalid post ID."
					})
				}
			})
			.catch((error) => {
				next(error)
			})
	}
}

module.exports = router;
