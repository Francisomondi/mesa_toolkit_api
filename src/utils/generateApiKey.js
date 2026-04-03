import crypto from "crypto";

export const generateApiKey = () => {
  return "live_" + crypto.randomBytes(24).toString("hex");
};