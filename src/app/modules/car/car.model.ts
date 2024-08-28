import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    features: { type: [String], default: [] },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    fuelType: { type: String, required: true },
    image: { type: String, required: true },
    mileage: { type: String, required: true },
    transmission: { type: String, required: true },
    year: { type: String, required: true },
  },
  { timestamps: true }
);

export const Car = model<TCar>("Car", carSchema);
