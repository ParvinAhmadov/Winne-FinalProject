const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found or missing." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next(); 
};
