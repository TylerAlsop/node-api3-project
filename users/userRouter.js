const express = require('express');
const users = require("./userDb");


const router = express.Router();


//////////////// GET ////////////////

router.get('/', (req, res) => {
  const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	users.find(options)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			next(error)

		})
});

router.get('/:id', (req, res) => {
	res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});


//////////////// POST ////////////////

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});


//////////////// PUT ////////////////

router.put('/:id', (req, res) => {
  // do your magic!
});

//////////////// DELETE ////////////////

router.delete('/:id', (req, res) => {
  // do your magic!
});


//////////////// Custom Middleware ////////////////


function validateUserId(req, res, next) {
  return (req, res, next) => {
		users.findById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user
					next()
				} else {
					res.status(400).json({
						message: "Invalid user ID"
					})
				}
			})
			.catch((error) => {
				next(error)
			})
	}
}

function validateUser(req, res, next) {
  return (req, res, next) => {
		if (!req.body) {
			return res.status(400).json({
				message: "Missing user data.",
			})
		} else if (!req.body.name) {
      return res.status(400).json({
				message: "Missing required name field.",
			})
    } else {
			next()
		}
	}
}

function validatePost(req, res, next) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Missing required text Field."
      })
    }
  }
}

module.exports = router;
