import express from "express";
import authRouter from "./routes/auth.routes.js";
import { handleError } from "./controllers/error.controller.js";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongodb.js";
dotenv.config();
const app = express();
// parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use(handleError);

const port = process.env.PORT || 5000;
app.listen(4000, () => {
  console.log(`Server is running on port ${port}!!!`);
  connectMongoDb();
});
