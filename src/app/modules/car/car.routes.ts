import { NextFunction, Request, Response, Router } from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createCarValidationSchema } from "./car.validation";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/sendImageToCloudinary";

const CarRoutes = Router();

CarRoutes.post(
  "/",
  auth("admin"),
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createCarValidationSchema),
  CarControllers.createCar,
);
CarRoutes.get("/", CarControllers.getAllCars);
CarRoutes.get("/:carId", CarControllers.getSingleCar);
CarRoutes.put(
  "/:carId",
  auth("admin"),
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  CarControllers.updateCar,
);
CarRoutes.delete("/:carId", auth("admin"), CarControllers.deleteCar);

export default CarRoutes;
