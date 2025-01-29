import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginUserValidation, registerUserValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const AuthRoutes = Router();

AuthRoutes.post(
  "/register",
  validateRequest(registerUserValidation),
  AuthController.registerUser,
);
AuthRoutes.post(
  "/login",
  validateRequest(loginUserValidation),
  AuthController.loginUser,
);
AuthRoutes.post(
  "/change-password",
  auth("user"),
  AuthController.changePassword,
);

export default AuthRoutes;
