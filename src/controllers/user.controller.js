import { response, Router } from "express";
import responses from "../helpers/responses.js";
import conn from "../main.js";
import userSchema from "../schemas/user.schema.js";
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  const sql = "SELECT * FROM users;";
  conn.query(sql, (err, result) => {
    if (err) responses.badRequest(res, err);
    return responses.success(res, "Test Get users", result);
  });
}); // TODO get all users

userRouter.post("/", (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) return responses.badRequest(res, error.details[0].message);
  const { name, email, password } = value;
  const hashedPasword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );

  const sql = "INSERT INTO users(name,email,password) VALUES(?,?,?)";
  conn.query(sql, [name, email, hashedPasword], (err, result) => {
    if (err) throw err;
    console.log("Inserted 1 row");
    console.log(result);
  });
  return responses.success(res, "User Created Successfully!", value);
});
userRouter.put("/", (req, res) => {}); // TODO update a user
userRouter.delete("/", (req, res) => {}); // TODO delete a user
userRouter.post("/login", (req, res) => {}); // TODO login user

export default userRouter;
