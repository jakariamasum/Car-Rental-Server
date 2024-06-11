import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();
router.post(
  "/signup",
  validateRequest(UserValidations.createUserSchemaValidation),
  UserControllers.signUp
);
router.post("/signin", UserControllers.signIn);
router.get("/", UserControllers.getAllUser);
router.get("/:userId", UserControllers.getSingleUser);

export const UserRoutes = router;
