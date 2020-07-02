const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

const Forum = require('../models/forum')
const Post = require('../models/post')


const router = express.Router()

router.post('forums/:id', requireToken, (req, res, next) => {
  Forum.findById(req.params.id)
    .then(handle404)
    .then(forum => {
      forum.posts.push(makePost(req.body.post))
      return forum
    })
    .then(forum => forum.save())
    .catch(next)
})

const makePost = function (post) {
  return {
    body: post.body,
    author: post.author,
    forum: post.forum
  }
}

module.exports = router
