import crypto from "crypto";

export const generateApiKey = () => {
  return "live_" + crypto.randomBytes(32).toString("hex");
};