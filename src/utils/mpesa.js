import axios from "axios";

export const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.data.access_token;
};


export const stkPush = async ({ phone, amount }) => {
  try {
    const token = await getAccessToken();

    const formatPhone = (phone) => {
      if (phone.startsWith("0")) {
        return "254" + phone.slice(1);
      }
      return phone;
    };

    // 🕒 Timestamp format: YYYYMMDDHHmmss
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:\.Z]/g, "")
      .slice(0, 14);

    // 🔑 Password = Base64(Shortcode + Passkey + Timestamp)
    const password = Buffer.from(
      process.env.SHORTCODE +
        process.env.PASSKEY +
        timestamp
    ).toString("base64");

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formatPhone(phone),
        PartyB: process.env.SHORTCODE,
        PhoneNumber: formatPhone(phone),
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "mpesaToolkit",
        TransactionDesc: "Mpesa Toolkit Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("STK PUSH ERROR:", error.response?.data || error.message);
    throw error;
  }
};