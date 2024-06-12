import express from "express";
import { CarControllers } from "./car.controller";
import {
  authMiddleware,
  isAdminMiddleware,
} from "../../middlewares/authMiddleware";
const router = express.Router();
router.post("/", authMiddleware, isAdminMiddleware, CarControllers.createCar);
router.get("/", CarControllers.getAllCar);
router.get("/:id", CarControllers.getSingleCar);
router.put("/return", CarControllers.returnCar);
router.put("/:id", authMiddleware, isAdminMiddleware, CarControllers.updateCar);
router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  CarControllers.deleteCar
);

export const CarRoutes = router;
