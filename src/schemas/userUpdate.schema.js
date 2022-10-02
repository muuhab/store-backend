import Joi from "joi";

const userUpdateSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-z ,.']+$/i),
  lastname: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-z ,.']+$/i),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .messages({
      "object.regex":
        "Minimum eight characters, at least one upper case, one lower case, one number and one special character",
    }),
});

export default userUpdateSchema;
