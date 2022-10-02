import { response, Router } from "express";
import responses from "../helpers/responses.js";
import userSchema from "../schemas/user.schema.js";
import userUpdateSchema from "../schemas/userUpdate.schema.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import userLoginSchema from "../schemas/userLogin.schema.js";

const prisma = new PrismaClient();

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  const { firstname, lastname, email, password } = value;
  if (error) return responses.badRequest(res, error.details[0].message);
  const emailExist = await prisma.user.findUnique({ where: { email: email } });
  if (emailExist) return responses.badRequest(res, "Email already exist");

  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  // create user in the database
  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      password: hashedPassword,
      email,
    },
  });

  return responses.success(res, "User created successfully!", user);
});

userRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany({});
  return responses.success(res, "Users fetched successfully!", users);
});

userRouter.get("/", async (req, res) => {}); // TODO get user by ID

userRouter.put("/:userId", async (req, res) => {
  const { error, value } = userUpdateSchema.validate(req.body);
  if (error) return responses.badRequest(res, error.details[0].message);
  const userId = req.params.userId;
  const userExist = await prisma.user.findUnique({ where: { id: +userId } });
  if (!userExist) return responses.notFound(res, "Id doesn't exist!");

  const userUpdated = await prisma.user.update({
    where: {
      id: +userId,
    },
    data: value,
  });

  const { password, ...rest } = userUpdated;
  return responses.success(res, "User updated successfully!", rest);
});

userRouter.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userExist = await prisma.user.findUnique({ where: { id: +userId } });
  if (!userExist) return responses.notFound(res, "Id doesn't exist!");
  const userDeleted = await prisma.user.delete({
    where: { id: +userId },
  });

  return responses.success(res, "User deleted successfully!", userDeleted);
});

userRouter.post("/login", async (req, res) => {
  const { error, value } = userLoginSchema.validate(req.body);
  if (error) return responses.badRequest(res, error.details[0].message);
  const { email, password } = value;
  const userExist = await prisma.user.findUnique({ where: { email: email } });
  if (!userExist) return responses.notFound(res, "Email doesn't exists");
  const match = bcrypt.compareSync(password, userExist.password);
  if (!match) {
    return responses.badRequest(res, "Invalid crediantials!");
  }
  const { password: hashedPassword, ...restData } = userExist;
  return responses.success(res, "Logged in successfully!", restData);
});

export default userRouter;
