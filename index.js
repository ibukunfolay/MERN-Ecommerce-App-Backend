import config from "./config.js";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
const PORT = process.env.PORT || 8000;
const mongodb_url = config.MONGODB_URL;

dotenv.config();
const app = express();
const server = http.createServer(app);

mongoose
  .connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//middleware
app.use(express.json());
app.get("/", (req, res) => {
  res.send("connected");
});
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

server.listen(PORT, () => console.log("server bingo"));
