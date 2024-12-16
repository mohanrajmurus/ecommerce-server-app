import express from "express";
import {
  createSellerAccount,
  sellerLogin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", createSellerAccount);
router.post("/login", sellerLogin);

export default router;
