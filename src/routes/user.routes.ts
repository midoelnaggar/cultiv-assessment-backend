import express from "express";
import { getMeUserController, loginUserController, registerUserController } from "../controllers/user.controllers";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { body } from "express-validator";

const userRouter = express.Router();

userRouter.route("/register").post(body("email").isEmail(), body("password").isLength({ min: 6 }), registerUserController);
userRouter.route("/login").post(body("email").isEmail(), body("password").isLength({ min: 6 }),loginUserController);
userRouter.route("/me").get(checkAuthMiddleware, getMeUserController);

export default userRouter