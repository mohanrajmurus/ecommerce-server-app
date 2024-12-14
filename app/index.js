import express from "express";
import dotenv from "dotenv";
import { initializeDBConnection } from "./config/db.js";
import authRoute from "./routes/auth.routes.js";
dotenv.config();
const { PORT, MONGO_URI } = process.env;

const app = express();

const validateENVs = () => {
  if (!MONGO_URI) {
    console.error(
      "Error: MONGO_URI is not defined in the environment variables."
    );
    process.exit(1);
  }

  if (!PORT) {
    console.warn("Warning: PORT is not defined. Using default port 4000.");
  }
};
const startSever = () => {
  try {
    validateENVs();
    initializeDBConnection(MONGO_URI);
    app.use(express.json());
    app.use("/auth", authRoute);
    app.listen(PORT || 4000, (err) => {
      if (err) console.error(err);
      else console.log(`server successfully running at:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Application failed to start:", error.message);
    process.exit(1);
  }
};

startSever();
