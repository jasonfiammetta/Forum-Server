const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Forum = require('../models/forum')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.get('/forums', (req, res, next) => {
  Forum.find()
    .populate('owner')
    .populate('posts.author')
    .then(forums => {
      return forums.map(forum => forum.toObject())
    })
    .then(forums => res.status(200).json({ forums: forums }))
    .catch(next)
})

router.get('/forums/:id', (req, res, next) => {
  Forum.findById(req.params.id)
    .populate('owner')
    .populate('posts.author')
    .then(handle404)
    .then(forum => res.status(200).json({ forum: forum.toObject() }))
    .catch(next)
})

router.post('/forums', requireToken, (req, res, next) => {
  console.log('post forum body', req.body)
  if (req.body) { console.log('post forum body forum', req.body.forum) }
  req.body.forum.owner = req.user.id

  Forum.create(req.body.forum)
    .then(forum => { res.status(201).json({ forum: forum.toObject() }) })
    .catch(next)
})

router.patch('/forums/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.forum.owner

  Forum.findById(req.params.id)
    .then(handle404)
    .then(forum => {
      requireOwnership(req, forum)
      return forum.updateOne(req.body.forum)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/forums/:id', requireToken, (req, res, next) => {
  Forum.findById(req.params.id)
    .then(handle404)
    .then(forum => {
      console.log('checking ownership')
      requireOwnership(req, forum)
      console.log('deleting')
      forum.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
