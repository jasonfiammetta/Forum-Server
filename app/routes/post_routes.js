const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

const Forum = require('../models/forum')
const Post = require('../models/post')

const router = express.Router()

router.post('/forums/:id/post', requireToken, (req, res, next) => {
  let post
  Forum.findById(req.params.id)
    .then(handle404)
    .then(forum => {
      post = makePost(req.body.post, req.user)
      forum.posts.push(post)
      return forum
    })
    .then(forum => forum.save())
    .then(_ => res.status(201).json(post))
    .catch(next)
})

const makePost = function (post, user) {
  return {
    body: post.body,
    author: user.id,
    forum: post.forum
  }
}

module.exports = router
