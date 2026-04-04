import Transaction from "../models/Transaction.js";
import { stkPush } from "../utils/mpesa.js";

export const stkPushController = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await stkPush({ phone, amount });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "STK Push failed" });
  }
};

export const mpesaCallback = async (req, res) => {
  try {
    console.log("MPESA CALLBACK RECEIVED:", JSON.stringify(req.body, null, 2));

    const callback = req.body.Body.stkCallback;

    const resultCode = callback.ResultCode;
    const resultDesc = callback.ResultDesc;

    if (resultCode !== 0) {
      console.log("Payment Failed:", resultDesc);
      return res.json({ message: "Callback received" });
    }

    // ✅ SUCCESSFUL PAYMENT
    if (resultCode === 0) {
        const metadata = callback.CallbackMetadata.Item;

        const data = {};
        metadata.forEach((item) => {
            data[item.Name] = item.Value;
        });

        const transaction = await Transaction.create({
            amount: data.Amount,
            phone: data.PhoneNumber,
            mpesaReceiptNumber: data.MpesaReceiptNumber,
            transactionDate: data.TransactionDate,
            status: "success",
        });

        console.log("Saved:", transaction);
        return res.json({ message: "Callback received" });
    }   
    

  } catch (error) {
    console.error("CALLBACK ERROR:", error);
    res.status(500).json({ message: "Callback error" });
  }
};

// 📜 Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("GET TRANSACTIONS ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};