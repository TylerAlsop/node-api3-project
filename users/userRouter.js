const express = require('express');
const users = require("./userDb");
const posts = require("../posts/postDb")


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

router.get('/:id', validateUserId(), (req, res) => {
	res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res
        .status(200)
        .json(posts)
    })
    .catch((error) => {
			next(error)
		})
});


//////////////// POST ////////////////

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
			next(error)
		})
});

///// Create User Post /////
/* 
********* Request does not stop *********
*/

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {

	posts.insert({ ...req.body, user_id: req.params.id })
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			next(error)
		})
});


//////////////// PUT ////////////////

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  users.update(req.params.id, req.body)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

//////////////// DELETE ////////////////

router.delete('/:id', (req, res) => {
  users.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({
        message: "The user you have selected has been deleted.",
      })
    } else {
      res.status(404).json({
        message: "The user you selected could not be found",
      })
    }
  })
  .catch((error) => {
    next(error)
  })
});


//////////////// Custom Middleware ////////////////


function validateUserId() {
  return (req, res, next) => {
		users.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user
					next()
				} else {
					res.status(400).json({
						message: "Invalid user ID."
					})
				}
			})
			.catch((error) => {
				next(error)
			})
	}
}

function validateUser() {
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

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({
        message: "Missing required text Field."
      })
    } else {
      next()
    }
  }
}

module.exports = router;
