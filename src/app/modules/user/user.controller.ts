import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import generateToken from "../../utils/generateToken";
import handleAppErros from "../../errors/handleAppErros";

const signUp = catchAsync(async (req, res) => {
  const result = await UserServices.signUpIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserServices.getSingleUserFromDB(email);

  if (user && (await user.matchPassword(password))) {
    const { password, ...userWithoutPassword } = user.toObject();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: userWithoutPassword,
      token: generateToken(user._id, user.role, user.email),
    });
  } else {
    throw new handleAppErros(404, "Email or password incorrect");
  }
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data retrived successfully!",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data retrived successfully!",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data updated successfully!",
    data: result,
  });
});

export const UserControllers = {
  signUp,
  signIn,
  getAllUser,
  getSingleUser,
  updateUser,
};
