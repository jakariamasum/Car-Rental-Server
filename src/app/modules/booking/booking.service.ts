/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Car } from "../car/car.model";
import handleAppErros from "../../errors/handleAppErros";

const createBookingIntoDB = async (payload: TBooking) => {
  let createdBooking;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    createdBooking = await Booking.create(payload);

    // Find the car associated with the booking and update its status
    const updatedCar = await Car.findOneAndUpdate(
      { _id: payload.car },
      { status: "unavailable" },
      { new: true, session }
    );

    if (!updatedCar) {
      throw new handleAppErros(404, "Car not found");
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  await (
    await createdBooking.populate("car")
  ).populate({
    path: "user",
    select: "-password",
  });
  return createdBooking;
};

const getAllBookingFromDB = async (filter: any) => {
  const queryConditions: any[] = [];
  if (filter.car) {
    queryConditions.push({ car: filter.car });
  }
  if (filter.date) {
    queryConditions.push({ date: filter.date });
  }

  const query = queryConditions.length > 0 ? { $and: queryConditions } : {};
  console.log(query);
  const result = await Booking.find(query)
    .populate({
      path: "user",
      select: "-password ",
    })
    .populate("car");
  return result;
};
const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findOne({ _id: id });
  return result;
};

const getUsersBookingFromDB = async (email: string) => {
  console.log("service", email);
  const result = await Booking.find()
    .populate("car")
    .populate({
      path: "user",
      select: "-password",
      match: { email: email },
    });
  const filteredResult = result.filter((booking) => booking.user !== null);
  return filteredResult;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const confirmBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndDelete({ _id: id });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  getUsersBookingFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
  confirmBookingIntoDB,
};
