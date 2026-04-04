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
    const metadata = callback.CallbackMetadata.Item;

    const data = {};

    metadata.forEach((item) => {
      data[item.Name] = item.Value;
    });

    const transaction = {
      amount: data.Amount,
      mpesaReceiptNumber: data.MpesaReceiptNumber,
      phone: data.PhoneNumber,
      transactionDate: data.TransactionDate,
    };

    console.log("✅ PAYMENT SUCCESS:", transaction);


    //save to database if needed
    

    res.json({ message: "Callback processed successfully" });

  } catch (error) {
    console.error("CALLBACK ERROR:", error);
    res.status(500).json({ message: "Callback error" });
  }
};