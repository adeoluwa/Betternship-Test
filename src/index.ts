import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";
import BaseRouter from "./routes/index"
// import logger from "./utils/logger";
import logEndpoints from "./middleware/logEndpoints.middleware";

dotenv.config();

const app = express();

// Initialize MongoDB Connection
connectDB();

const PORT = process.env.PORT || 4001;

const CorsOption = {
  origin: [`https://betternship-test.onrender.com/`],
  optionalSuccessStatus: 200,
  credentials: true,
};

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(CorsOption));

app.use(logEndpoints)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Welcome to Betternship Apititude Test API",
  });
});

app.use("/api/v1",BaseRouter)

app.listen(PORT, () => {
  console.log(`ServerRunning on Port https://betternship-test.onrender.com/`);
});
