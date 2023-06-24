const express = require("express");
const authMiddleware = require("../auth/authMiddleware");
const router = express.Router();
const moderatorController = require("./moderatorController");
//Get a user by username or email or firstName or lastName or id
router.get("/", function (req, res, next) {
  moderatorController.getUser(req, res);
});

router.get("/verify-status", function (req, res, next) {
  moderatorController.verifyStatus(req, res);
});

//get user info by username
router.get("/profile/:username", moderatorController.getUserByUsername);

// [POST] /users/verify/email/send
router.get("/verify/email/send", function (req, res, next) {
  moderatorController.reSendVerifyEmail(req, res);
});

module.exports = router;
