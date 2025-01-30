import { Router } from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createCarValidationSchema } from "./car.validation";
import auth from "../../middlewares/auth";

const CarRoutes = Router();

CarRoutes.post(
  "/",
  validateRequest(createCarValidationSchema),
  CarControllers.createCar,
);
CarRoutes.get("/", CarControllers.getAllCars);
CarRoutes.get("/:carId", CarControllers.getSingleCar);
CarRoutes.put("/:carId", auth("admin"), CarControllers.updateCar);
CarRoutes.delete("/:carId", auth("admin"), CarControllers.deleteCar);

export default CarRoutes;
