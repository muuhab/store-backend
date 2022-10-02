import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandller.js";
import userRouter from "./controllers/user.controller.js";

dotenv.config(); // load environment variables

const app = express(); // create express app

app.use(express.json()); // to parse json data

app.use(morgan("dev")); // to log requests

app.use(errorHandler); // to handle errors

app.use("/users", userRouter);

const PORT = process.env.PORT || 3000; // set port

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // listen for requests
