import mongoose from "mongoose";
import calculateDurationInHours from "../../utils/calculateDurationInHours";
import { TBooking } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import handleAppErros from "../../errors/handleAppErros";

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await Car.find({ isDeleted: false });
  return result;
};

const getCarsBySearchFromDB = async (search: string) => {
  const result = await Car.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { pricePerHour: { $regex: search, $options: "i" } },
    ],
  });
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findOne({ _id: id });
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteCarFromDB = async (id: string) => {
  const result = await Car.findOneAndUpdate(
    { _id: id },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

const returnCarFromDB = async (id: string, endTime: string) => {
  const session = await Booking.startSession();

  try {
    session.startTransaction();
    const existingBooking: TBooking | null = await Booking.findOne({ _id: id })
      .populate("car")
      .session(session);

    if (!existingBooking) {
      throw new handleAppErros(404, "Booking not found");
    }

    // Calculate total cost
    const duration = calculateDurationInHours(
      existingBooking.startTime,
      endTime
    );
    let total;
    if (!(existingBooking.car instanceof mongoose.Types.ObjectId)) {
      const { pricePerHour } = existingBooking.car;
      console.log(pricePerHour);
      total = duration * pricePerHour;
    }

    // Update the car status to "available"
    await Car.findOneAndUpdate(
      { _id: existingBooking.car._id },
      { $set: { status: "available" } },
      { new: true, session }
    );

    // Update total cost, endTime, and isBooked in the booking
    await Booking.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          totalCost: total,
          endTime: endTime,
          isBooked: "confirmed",
        },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Fetch and return the updated booking
    const updatedBooking = await Booking.findOne({ _id: id })
      .populate("car")
      .populate({
        path: "user",
        select: "-password",
      });
    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new handleAppErros(404, "Error returning car");
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnCarFromDB,
  getCarsBySearchFromDB,
};
