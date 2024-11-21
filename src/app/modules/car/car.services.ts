import { ICar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (carData: ICar) => {
  const result = await Car.create({
    ...carData,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return result;
};

const getCarsFromDB = async () => {
  const result = await Car.find();
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getCarsFromDB,
};
