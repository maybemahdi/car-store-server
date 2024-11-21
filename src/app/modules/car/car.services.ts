import { Request } from "express";
import { ICar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (carData: ICar) => {
  const result = await Car.create(carData);
  return result;
};

const getCarsFromDB = async (req: Request) => {
  const { searchTerm } = req.query;
  let filter = {};
  if (searchTerm) {
    // Create a regex to perform case-insensitive search for any matching field
    const regex = new RegExp(searchTerm as string, "i");

    filter = {
      $or: [{ brand: regex }, { model: regex }, { category: regex }],
    };
  }
  const result = await Car.find(filter);
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getCarsFromDB,
};
