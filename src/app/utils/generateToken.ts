import jwt from "jsonwebtoken";
import config from "../config";
const generateToken = (id: any, role: string) => {
  return jwt.sign({ id, role }, config.jwt_secret as string, {
    expiresIn: "30d",
  });
};
export default generateToken;
