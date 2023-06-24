const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ModeratorSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },

    email: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("moderators", ModeratorSchema);
