const express = require("express");
const router = express.Router();
const bookTempController = require("./bookTempController");

// get list book_temps
router.get("/", function (req, res, next) {
  bookTempController.getBookTemps(req, res);
});

// Moderator accept for author publish book
router.post("/accept", function (req, res, next) {
  bookTempController.acceptBookTemp(req, res);
});

// Moderator refuse for author publish book
router.post("/refuse", function (req, res, next) {
  bookTempController.refuseBookTemp(req, res);
});

module.exports = router;
