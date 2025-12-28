const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password -__v");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check if password was changed after token was issued
    if (user.passwordChangedAt) {
      const passwordChangedTimestamp = Math.floor(
        user.passwordChangedAt.getTime() / 1000
      );
      const tokenIssuedAt = decoded.iat || 0;

      if (passwordChangedTimestamp > tokenIssuedAt) {
        // Clear the invalid token cookie
        res.clearCookie("token");
        return res.status(401).json({
          error: "Password was recently changed. Please login again.",
        });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = {
  userAuth,
};
