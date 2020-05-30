var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.status(200).send("hello world!");
});

// TODO::client type returns
// TODO::black boards contents returns
// TODO::Classroom Alarms returns
