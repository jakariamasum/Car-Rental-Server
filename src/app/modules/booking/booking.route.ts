import express from "express";
import { BookingControllers } from "./booking.controller";
import {
  authMiddleware,
  isAdminMiddleware,
  isUserMiddleware,
} from "../../middlewares/authMiddleware";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
const router = express.Router();
router.post(
  "/",
  validateRequest(BookingValidations.createBookingSchemaValidation),
  authMiddleware,
  isUserMiddleware,
  BookingControllers.createBooking
);
router.get("/", BookingControllers.getAllBooking);
router.get(
  "/my-bookings",
  authMiddleware,
  isUserMiddleware,
  BookingControllers.getUserBookings
);
router.get(
  "/my-bookings",
  authMiddleware,
  isUserMiddleware,
  BookingControllers.getUserBookings
);
router.put(
  "/my-bookings/:id",
  authMiddleware,
  isUserMiddleware,
  BookingControllers.updateBooking
);
router.delete(
  "/my-bookings/:id",
  authMiddleware,
  isUserMiddleware,
  BookingControllers.deleteBooking
);

export const BookingRoutes = router;
