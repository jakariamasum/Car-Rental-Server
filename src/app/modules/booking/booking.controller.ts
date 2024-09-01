/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import handleAppErros from "../../errors/handleAppErros";

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
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingIntoDB(id, req.body);
  if (!result) {
    throw new handleAppErros(404, "Booking not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Bookings updated successfully",
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);
  if (!result) {
    throw new handleAppErros(404, "Booking not found");
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
