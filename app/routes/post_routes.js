const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

const Forum = require('../models/forum')
// const Post = require('../models/post')

const router = express.Router()

router.post('/forums/:id/post', requireToken, (req, res, next) => {
  let post
  let postIndex
  Forum.findById(req.params.id)
    .then(handle404)
    .then(forum => {
      post = makePost(req.body.post, req.user)
      postIndex = forum.posts.push(post)
      console.log('push? ', postIndex)
      return forum
    })
    .then(forum => forum.save()) // figure out if one or both of these saves is necessary
    .then(forum => forum.populate('owner')
      .populate('posts.author'))
    .then(forum => forum.save())
    .then(forum => {
      // console.log('sending post: ', post)
      // console.log('with id?', Forum.findById(post.forum).posts.id(post._id))
      // console.log('array index? ', forum.posts[postIndex - 1]) // successfully sends back timestamps
      res.status(201).json(post)
    })
    .catch(next)
})

const makePost = function (post, user) {
  return { // return new Post({
    _id: mongoose.Types.ObjectId(),
    body: post.body,
    author: user.id,
    forum: post.forum
  }
}

module.exports = router
