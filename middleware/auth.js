const jwt = require("express-jwt");

const authMiddleware = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth", // This will attach the decoded JWT payload to req.auth
});

// Middleware to check if the user is an admin
const requireAdmin = (req, res, next) => {
  if (!req.auth || !req.auth.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authMiddleware, requireAdmin };
