import QueryBuilder from "../../builder/QueryBuilder";
import { ICar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (carData: ICar) => {
  const result = await Car.create(carData);
  return result;
};

const getCarsFromDB = async (query: Record<string, unknown>) => {
  const carsQuery = new QueryBuilder(Car.find(), query)
    .search(["brand", "model", "category", "availability"])
    .filter();

  const result = await carsQuery.modelQuery;
  return result;
};

const getSingleCarFromDB = async (carId: string) => {
  const result = await Car.findOne({ _id: carId });
  return result;
};

const updateCarInDB = async (carId: string, updateData: ICar) => {
  const result = await Car.findByIdAndUpdate(
    carId,
    {
      ...updateData,
      inStock: updateData.quantity !== undefined && updateData.quantity > 0,
    },
    { new: true },
  );
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
