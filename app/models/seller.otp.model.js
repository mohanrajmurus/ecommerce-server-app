import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "30m" },
});

export const Otp = model("Otp", otpSchema);
