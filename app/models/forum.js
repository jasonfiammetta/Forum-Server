const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // description: {
  //   type: String,
  //   required: true
  // },
  posts: [{
    type: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Forum', forumSchema)
