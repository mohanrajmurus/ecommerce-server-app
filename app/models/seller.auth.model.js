import mongoose, { Schema } from "mongoose";

const authSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Auth = mongoose.model("Auth", authSchema);
