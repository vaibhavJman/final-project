const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify token and attach user data to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request (e.g., userId, role)
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
