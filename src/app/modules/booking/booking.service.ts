import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = (await Booking.create(payload)).populate("car");
  return result;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find();
  return result;
};
const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findOne({ _id: id });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
};
