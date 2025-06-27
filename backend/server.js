import express from "express";
import authRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongodb.js";
dotenv.config();
const app = express();

app.use("/", authRouter);
const port = process.env.PORT || 5000;
app.listen(4000, () => {
  console.log(`Server is running on port ${port}!!!`);
  connectMongoDb();
});
