import { TUser } from "./user.interface";
import { User } from "./user.model";

const signUpIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const signInIntoDB = async (payload: any) => {
  const result = await User.create(payload);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};

export const UserServices = {
  signUpIntoDB,
  signInIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
