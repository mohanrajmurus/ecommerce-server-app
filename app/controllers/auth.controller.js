import { authValidationSchema } from "../constant/auth.js";
import { Auth } from "../models/seller.auth.model.js";
import { genSalt, hash } from "bcrypt";

export const createSellerAccount = async (req, res) => {
  try {
    const { error } = authValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { firstName, lastName, email, mobileNumber, password } = req.body;
    const existSeller = await Auth.findOne({ email });
    if (existSeller)
      return res?.status(400).json({ message: "email id already exist" });
    const hashedPassword = await hash(password, await genSalt(10));

    const seller = await Auth.create({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
    });
    return seller
      ? res.status(201).json({ _id: seller._id })
      : res.status(400).send("Invalid Parameters");
  } catch (error) {}
};
