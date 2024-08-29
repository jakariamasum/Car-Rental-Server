/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import config from "../config";
const generateToken = (id: any, role: string, email: string) => {
  return jwt.sign({ id, role, email }, config.jwt_secret as string, {
    expiresIn: "30d",
  });
};
export default generateToken;
