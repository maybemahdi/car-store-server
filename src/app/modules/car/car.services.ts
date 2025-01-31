/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import { ICar } from "./car.interface";
import { Car } from "./car.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createCarIntoDB = async (file: any, carData: ICar) => {
  const imageName = `${carData.year}${carData?.brand}${carData.quantity}`;
  const { secure_url } = (await sendImageToCloudinary(
    imageName,
    file?.path,
  )) as { secure_url: string };
  const result = await Car.create(carData);
  result.image = secure_url;
  await result.save();
  return result;
};

const getCarsFromDB = async (query: Record<string, unknown>) => {
  const carsQuery = new QueryBuilder(Car.find({ isDeleted: false }), query)
    .search(["brand", "model", "category", "availability"])
    .filter()
    .sort()
    .paginate();

  const result = await carsQuery.modelQuery;
  return result;
};

const getSingleCarFromDB = async (carId: string) => {
  const result = await Car.findOne({ _id: carId });
  return result;
};

const updateCarInDB = async (carId: string, updateData: Partial<ICar>, file?: any) => {
  let secure_url;
  if (file) {
    const imageName = `${updateData.year || ''}${updateData?.brand || ''}${updateData.quantity || ''}`;
    const response = await sendImageToCloudinary(imageName, file?.path);
    secure_url = response.secure_url;
  }

  const updateFields = {
    ...updateData,
    ...(secure_url ? { image: secure_url } : {}),
    ...(updateData?.quantity !== undefined && { inStock: updateData.quantity > 0 }),
  };

  const result = await Car.findByIdAndUpdate(carId, updateFields, { new: true });
  return result;
};

const deleteCarInDB = async (carId: string) => {
  const result = await Car.findByIdAndUpdate(
    carId,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getCarsFromDB,
  getSingleCarFromDB,
  updateCarInDB,
  deleteCarInDB,
};
