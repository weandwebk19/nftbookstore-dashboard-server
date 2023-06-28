const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorRequestSchema = new Schema({
  hash: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("author_requests", AuthorRequestSchema);
