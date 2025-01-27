import { Router } from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createCarValidationSchema } from "./car.validation";

const CarRoutes = Router();

CarRoutes.post(
  "/",
  validateRequest(createCarValidationSchema),
  CarControllers.createCar,
);
CarRoutes.get("/", CarControllers.getAllCars);
CarRoutes.get("/:carId", CarControllers.getSingleCar);
CarRoutes.put("/:carId", CarControllers.updateCar);
CarRoutes.delete("/:carId", CarControllers.deleteCar);

export default CarRoutes;
