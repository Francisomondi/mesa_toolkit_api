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