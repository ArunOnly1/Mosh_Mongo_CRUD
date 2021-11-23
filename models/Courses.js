const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: { type: [String] },
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean, required: true },
  price: {
    type: Number,
    required: function () {
      return this.isPublished
    },
  },
})

module.exports.Course = mongoose.model('Course', courseSchema)
