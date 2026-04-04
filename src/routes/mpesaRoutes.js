import express from "express";
import { stkPushController, mpesaCallback ,getTransactions, getTransactionsByPhone} from "../controllers/mpesaController.js";
import { apiKeyAuth } from "../middleware/apiKeyMiddleware.js";


const router = express.Router();

router.post("/stkpush", apiKeyAuth, stkPushController);
router.post("/callback",apiKeyAuth, mpesaCallback);
router.get("/transactions/:phone",apiKeyAuth, getTransactionsByPhone);
router.get("/transactions",apiKeyAuth, getTransactions);



export default router;