import express from "express";
import { stkPushController } from "../controllers/mpesaController.js";

const router = express.Router();

router.post("/stkpush", stkPushController);


export default router;