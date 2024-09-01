import express from "express";
import { CarControllers } from "./car.controller";
import {
  authMiddleware,
  isAdminMiddleware,
} from "../../middlewares/authMiddleware";
import { CarValidations } from "./car.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();
router.post(
  "/",
  validateRequest(CarValidations.createCarValidationSchema),
  authMiddleware,
  isAdminMiddleware,
  CarControllers.createCar
);
router.get("/", CarControllers.getAllCar);
router.get("/:id", CarControllers.getSingleCar);

router.get("/search/:searchTerm", CarControllers.getCarsBySearch);
router.put(
  "/return",
  authMiddleware,
  isAdminMiddleware,
  CarControllers.returnCar
);
router.put(
  "/:id",
  validateRequest(CarValidations.updateCarValidationSchema),
  authMiddleware,
  isAdminMiddleware,
  CarControllers.updateCar
);
router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  CarControllers.deleteCar
);

export const CarRoutes = router;
