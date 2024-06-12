import calculateDurationInHours from "../../utils/calculateDurationInHours";
import { Booking } from "../booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await Car.find({ isDeleted: false });
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
    const existingBooking = await Booking.findOne({ _id: id }).populate("car");

    if (!existingBooking) {
      throw new Error("Booking not found");
    }

    // Calculate total cost
    const duration = calculateDurationInHours(
      existingBooking.startTime,
      endTime
    );
    const total = duration * existingBooking.car.pricePerHour;

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
    const updatedBooking = await Booking.findOne({ _id: id }).populate("car");
    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Error returning car");
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
  returnCarFromDB,
};
