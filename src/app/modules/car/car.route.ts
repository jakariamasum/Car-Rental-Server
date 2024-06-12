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
router.put("/:id", CarControllers.updateCar);
router.delete("/:id", CarControllers.deleteCar);

export const CarRoutes = router;
