import { Request } from "express";
import { ICar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (carData: ICar) => {
  const result = await Car.create(carData);
  return result;
};

const getCarsFromDB = async (searchTerm: string) => {
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

const getSingleCarFromDB = async (carId: string) => {
  const result = await Car.findOne({ _id: carId });
  return result;
};

const updateCarInDB = async (carId: string, updateData: ICar) => {
  const result = await Car.findByIdAndUpdate(carId, updateData, { new: true });
  return result;
};

const deleteCarInDB = async (carId: string) => {
  const result = await Car.findByIdAndDelete(carId);
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getCarsFromDB,
  getSingleCarFromDB,
  updateCarInDB,
  deleteCarInDB,
};
