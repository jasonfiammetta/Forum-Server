const mongoose = require('mongoose')
const postSchema = require('./post.js')

const forumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // description: {
  //   type: String,
  //   required: true
  // },
  posts: [postSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Forum', forumSchema)
