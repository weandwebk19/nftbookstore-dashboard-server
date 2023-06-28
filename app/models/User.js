const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  wallet_address: {
    type: String,
    required: true,
  },

  fullname: {
    type: String,
    required: false,
  },

  is_author: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("users", UserSchema);
