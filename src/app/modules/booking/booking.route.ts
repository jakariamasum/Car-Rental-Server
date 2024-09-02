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
router.put(
  "/confirm-booking/:id",
  authMiddleware,
  isAdminMiddleware,
  BookingControllers.confirmBooking
);

router.get(
  "/",
  authMiddleware,
  isAdminMiddleware,
  BookingControllers.getAllBooking
);

//user routes
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
