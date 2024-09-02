import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "block"],
      default: "active",
    },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrpt_salt_rounds)
  );
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = model<TUser>("User", userSchema);
