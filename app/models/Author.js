const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  pseudonym: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone_number: {
    type: String,
    required: false,
  },

  website: {
    type: String,
    required: false,
  },

  wallet_address: {
    type: String,
    required: true,
    unique: true,
  },

  facebook: {
    type: String,
    required: false,
  },

  twitter: {
    type: String,
    required: false,
  },

  linked_in: {
    type: String,
    required: false,
  },

  instagram: {
    type: String,
    required: false,
  },

  front_document: {
    type: Object,
    required: false,
  },

  back_document: {
    type: Object,
    required: false,
  },

  picture: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model("authors", AuthorSchema);
