const express = require("express");
const router = express.Router();

const { logon, hello } = require("../controllers/authController");
const auth = require("../middleware/auth");

// POST /api/v1/logon -> returns token
router.post("/logon", logon);

// GET /api/v1/hello -> protected route
router.get("/hello", auth, hello);

module.exports = router;
