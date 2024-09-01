import { TUser } from "./user.interface";
import { User } from "./user.model";

const signUpIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  const userWithoutPassword = await User.findById(result._id).select(
    "-password"
  );

  return userWithoutPassword;
};

const signInIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  const userWithoutPassword = await User.findById(result._id).select(
    "-password"
  );

  return userWithoutPassword;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email: email });
  return result;
};
const updateUserIntoDB = async (email: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ email: email }, payload, {
    new: true,
  }).select("name role phone email");
  return result;
};

export const UserServices = {
  signUpIntoDB,
  signInIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
};
