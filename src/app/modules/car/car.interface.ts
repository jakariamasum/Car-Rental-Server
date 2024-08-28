export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  image: string;
  year: string;
  mileage: string;
  fuelType: string;
  transmission: string;
};
