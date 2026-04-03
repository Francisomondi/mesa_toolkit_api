import User from "../models/User.js";

export const apiKeyAuth = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        message: "API key missing",
      });
    }

    // Find user with this API key
    const user = await User.findOne({ apiKey });

    if (!user) {
      return res.status(403).json({
        message: "Invalid API key",
      });
    }

    // Attach user
    req.user = user;

    next();

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};