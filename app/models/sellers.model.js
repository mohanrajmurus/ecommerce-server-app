import mongoose, { Schema } from "mongoose";
const addressSchema = new Schema({
  doorNo: { type: String, required: true },
  street: { type: String, required: true },
  locality: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
});
const sellerSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
  storeName: { type: String, required: true },
  address: { type: addressSchema, required: true },
  pickupAddress: { type: addressSchema, required: true },
  panCard: { type: String, required: true },
  aadhaarCard: { type: String, required: true },
  alternateMobileNumber: { type: String },
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
