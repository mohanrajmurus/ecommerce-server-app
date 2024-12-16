import {
  authValidationSchema,
  generateToken,
  loginValidationSchema,
} from "../constant/auth.js";
import { Auth } from "../models/seller.auth.model.js";
import { compare, genSalt, hash } from "bcrypt";

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

export const sellerLogin = async (req, res) => {
  try {
    const { error } = loginValidationSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { email, password } = req.body;
    const seller = await Auth.findOne({ email });
    if (seller) {
      if (await compare(password, seller?.password)) {
        return res.status(200).json({
          id: seller?._id,
          firstName: seller.firstName,
          lastName: seller.lastName,
          email: seller?.email,
          mobileNumber: seller?.mobileNumber,
          isEmailVerified: seller.isEmailVerified,
          passcode: generateToken(seller._id),
        });
      } else res.status(400).json({ message: "Wrong password" });
    } else
      return res.status(400).send({ message: "Email not registered with us" });
  } catch (error) {}
};
