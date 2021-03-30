var express = require("express");
var router = express.Router();
var users = require("../models").users;

/* GET users listing. */
router.post("/", async function (req, res, next) {
  if (req.body === "") {
    res.status(404).send("Request body required");
  } else {
    var user = await users.create(req.body);
    res.status(201).send(user);
  }
});

module.exports = router;
