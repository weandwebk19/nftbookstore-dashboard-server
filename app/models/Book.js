const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  token_id: {
    type: Number,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 5000,
  },

  external_link: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 2000,
  },

  total_pages: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 20,
  },

  user_created: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  is_approved: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("books", BookSchema);
