const jwt = require('jsonwebtoken');
const config = require('../config');

// Authentication middleware
exports.authMiddleware = (req, res, next) => {
  // Get the access token from the request headers or query parameters
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  const token = authorizationHeader.replace('Bearer ', '');
  console.log("token",token);
  try {
    // Verify the access token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Set the user ID in the request object
    req.user = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};
