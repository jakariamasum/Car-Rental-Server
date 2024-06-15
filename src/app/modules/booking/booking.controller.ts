import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { TBooking } from "./booking.interface";

const createBooking = catchAsync(async (req, res) => {
  const { carId, ...otherDetails } = req.body;
  const payload = { car: carId, ...otherDetails, user: req._id };
  const result = await BookingServices.createBookingIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car booked successfully",
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const { carId, date } = req.query;
  const filter: any = {};
  if (carId) {
    filter.car = carId;
  }

  if (date) {
    filter.date = date;
  }
  const result = await BookingServices.getAllBookingFromDB(filter);
  if (result.length > 0) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: result,
    });
  }
});

const getUserBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getUsersBookingFromDB(
    req.email as string
  );
  if (result.length > 0) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Bookings retrieved successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: result,
    });
  }
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserBookings,
};
