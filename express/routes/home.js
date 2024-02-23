const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App",
    message: "Hello From Node Js",
  });
});

module.exports = router;
