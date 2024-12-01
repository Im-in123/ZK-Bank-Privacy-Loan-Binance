// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is passed as "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Assign the decoded userId to request object
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};

export { protect };
