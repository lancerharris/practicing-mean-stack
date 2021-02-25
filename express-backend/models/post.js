const mongoose = require("mongoose");
const { TimeoutError } = require("rxjs");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },

  content: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema)
