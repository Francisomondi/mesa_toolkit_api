import express from "express";
import { apiKeyAuth } from "../middleware/apiKeyMiddleware.js";

const router = express.Router();

// Protected API route
router.get("/data", apiKeyAuth, (req, res) => {
  res.json({
    message: "Secure data accessed",
    user: req.user.email,
  });
});

export default router;  