import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import mpesaRoutes from "./routes/mpesaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api/mpesa", mpesaRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Mpesa Toolkit API",
  });
});

export default app;