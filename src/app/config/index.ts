import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  db_url: process.env.URI,
  jwt_secret: process.env.JWT_SECRET,
  bycrpt_salt_rounds: process.env.bycrpt_salt_rounds,
};
