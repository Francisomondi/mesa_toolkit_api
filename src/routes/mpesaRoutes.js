import express from "express";
import { stkPushController, mpesaCallback } from "../controllers/mpesaController.js";


const router = express.Router();

router.post("/stkpush", stkPushController);
router.post("/callback", mpesaCallback);


export default router;