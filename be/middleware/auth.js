const jwt = require("jsonwebtoken");

/**
 * Authentication middleware - verify JWT token
 * Extracts userId from token and attaches to request
 */
function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
}

module.exports = authenticateToken;
