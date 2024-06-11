import jwt from "jsonwebtoken";
import config from "../config";
const generateToken = (id: any) => {
  return jwt.sign({ id }, config.jwt_secret as string, { expiresIn: "30d" });
};
export default generateToken;
