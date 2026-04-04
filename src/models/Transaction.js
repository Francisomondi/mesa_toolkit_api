import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: Number,
    phone: String,
    mpesaReceiptNumber: String,
    transactionDate: String,
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);