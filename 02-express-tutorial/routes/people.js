const express = require("express");
const router = express.Router();
const { people } = require("../data");

router.get("/", (req, res) => {
  res.json({ success: true, data: people });
});

module.exports = router;
