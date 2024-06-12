import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car created successfully",
    data: result,
  });
});
const getAllCar = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.updateCarIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});
const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});

const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;
  const result = await CarServices.returnCarFromDB(bookingId, endTime);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car data received successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCar,
};
