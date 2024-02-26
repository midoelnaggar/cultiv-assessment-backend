import express from "express";
import { getMeUserController, loginUserController, registerUserController } from "../controllers/user.controllers";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";

const userRouter = express.Router();

userRouter.route("/register").post(registerUserController);
userRouter.route("/login").post(loginUserController);
userRouter.route("/me").get(checkAuthMiddleware, getMeUserController);

export default userRouter