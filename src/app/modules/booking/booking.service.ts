import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Car } from "../car/car.model";

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
      throw new Error("Car not found");
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  await (await createdBooking.populate("car")).populate("user");

  return createdBooking;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate("user");
  return result;
};
const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findOne({ _id: id });
  return result;
};

const getUsersBookingFromDB = async (email: string) => {
  console.log("service", email);
  const result = await Booking.find().populate({
    path: "user",
    match: { email: email },
  });
  const filteredResult = result.filter((booking) => booking.user !== null);
  return filteredResult;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  getUsersBookingFromDB,
};
