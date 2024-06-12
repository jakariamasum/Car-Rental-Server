import express from "express";
import { BookingControllers } from "./booking.controller";
import {
  authMiddleware,
  isUserMiddleware,
} from "../../middlewares/authMiddleware";
const router = express.Router();
router.post(
  "/",
  authMiddleware,
  isUserMiddleware,
  BookingControllers.createBooking
);
router.get("/", BookingControllers.getAllBooking);
router.get(
  "/my-bookings",
  authMiddleware,
  isUserMiddleware,
  BookingControllers.getMyBookings
);

export const BookingRoutes = router;
