import { Router } from "express";
import { CarControllers } from "./car.controller";

const CarRoutes = Router();

CarRoutes.post("/", CarControllers.createCar)
CarRoutes.get("/", CarControllers.getAllCars)
CarRoutes.get("/:carId", CarControllers.getSingleCar);
CarRoutes.put("/:carId", CarControllers.updateCar);
CarRoutes.delete("/:carId", CarControllers.deleteCar);

export default CarRoutes
