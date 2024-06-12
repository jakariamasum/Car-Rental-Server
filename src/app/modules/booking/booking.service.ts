import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = (
    await (await Booking.create(payload)).populate("car")
  ).populate("user");
  return result;
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
