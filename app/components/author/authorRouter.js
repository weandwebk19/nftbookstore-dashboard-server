const express = require("express");
const router = express.Router();
const authorController = require("./authorController");

//Get list author request
router.get("/request", function (req, res, next) {
  authorController.getAuthorRequests(req, res);
});

router.post("/request/accept", function (req, res, next) {
  authorController.acceptAuthor(req, res);
});
router.post("/request/refuse", function (req, res, next) {
  authorController.refuseAuthor(req, res);
});

module.exports = router;
