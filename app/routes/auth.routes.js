import express from "express";
import { createSellerAccount } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", createSellerAccount);

export default router;
