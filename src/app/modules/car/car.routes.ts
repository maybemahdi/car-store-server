import { Router } from "express";
import { CarControllers } from "./car.controller";

const CarRoutes = Router();

CarRoutes.post("/", CarControllers.createCar)
CarRoutes.get("/", CarControllers.getAllCars)
CarRoutes.get("/:carId", CarControllers.getSingleCar);

export default CarRoutes
