const express = require("express");
const router = express.Router();
const bookTempController = require("./bookTempController");

// get list book_temps
router.get("/", function (req, res, next) {
  bookTempController.getBookTemps(req, res);
});

module.exports = router;
