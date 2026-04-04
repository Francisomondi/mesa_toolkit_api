import express from "express";
import { stkPushController, mpesaCallback ,getTransactions} from "../controllers/mpesaController.js";


const router = express.Router();

router.post("/stkpush", stkPushController);
router.post("/callback", mpesaCallback);
router.get("/transactions", getTransactions);


export default router;