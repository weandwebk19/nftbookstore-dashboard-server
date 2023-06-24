const express = require("express");
const router = express.Router();
const userController = require("./userController");

//Get a user by username or email or firstName or lastName or id
router.get("/", function (req, res, next) {
  userController.getUser(req, res);
});

router.get("/verify-status", function (req, res, next) {
  userController.verifyStatus(req, res);
});

//get user info by username
router.get("/profile/:username", userController.getUserByUsername);

// [POST] /users/verify/email/send
router.get("/verify/email/send", function (req, res, next) {
  userController.reSendVerifyEmail(req, res);
});

module.exports = router;
