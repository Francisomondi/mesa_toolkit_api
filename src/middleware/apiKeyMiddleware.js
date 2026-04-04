import User from "../models/User.js";

export const apiKeyAuth = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    //No key
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key missing",
      });
    }

    // 🔍 Find user by API key
    const user = await User.findOne({ apiKey });

    //Invalid key
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid API key",
      });
    }

    //Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("API KEY AUTH ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};