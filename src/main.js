import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandller.js";

const app = express(); // create express app

dotenv.config(); // load environment variables

app.use(express.json()); // to parse json data

app.use(morgan("dev")); // to log requests

app.use(errorHandler); // to handle errors

const PORT = process.env.PORT || 3000; // set port

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // listen for requests
