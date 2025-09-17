const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Authorization: Bearer <token>
  const authHeader = req.get("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // throws if invalid/expired
    req.user = { name: decoded.name };
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
