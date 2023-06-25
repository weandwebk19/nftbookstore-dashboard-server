const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookTempSchema = new Schema({
  token_id: {
    type: Number,
    required: true,
    unique: true,
  },

  nft_uri: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  book_file: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  book_sample: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  book_cover: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  private_key: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  iv_key: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  quantity: {
    type: Number,
    required: false,
  },

  title: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  author: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },

  timestamp: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 2000,
  },
});

module.exports = mongoose.model("book_temps", BookTempSchema);
