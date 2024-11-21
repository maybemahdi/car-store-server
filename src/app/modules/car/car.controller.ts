import { Request, Response } from "express";
import { CarServices } from "./car.services";

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;
    const result = await CarServices.createCarIntoDB(carData);
    res.json({
      message: "Car created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create a Car",
      success: false,
      error: error,
    });
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await CarServices.getCarsFromDB(req);
    res.json({
      message: "Cars retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to get all Cars",
      success: false,
      error: error,
    });
  }
};

export const CarControllers = {
  createCar,
  getAllCars,
};
