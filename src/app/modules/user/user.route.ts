import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();
router.post(
  "/signup",
  validateRequest(UserValidations.signUpSchemaValidation),
  UserControllers.signUp
);
router.post(
  "/signin",
  validateRequest(UserValidations.sinInSchemaValidation),
  UserControllers.signIn
);
router.put("/:id", UserControllers.updateUser);
router.get("/", UserControllers.getAllUser);
router.get("/:userId", UserControllers.getSingleUser);

export const UserRoutes = router;
