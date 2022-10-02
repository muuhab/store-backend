import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {}); // TODO get all users
userRouter.post("/", (req, res) => {}); // TODO create a new user
userRouter.put("/", (req, res) => {}); // TODO update a user
userRouter.delete("/", (req, res) => {}); // TODO delete a user
userRouter.post("/login", (req, res) => {}); // TODO login user

export default userRouter;
