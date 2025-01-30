import { Request, Response } from "express";
import { CarServices } from "./car.services";
import { ICar } from "./car.interface";

const createCar = async (req: Request, res: Response) => {
  try {
    const carData: ICar = req.body;
    const result = await CarServices.createCarIntoDB(carData);
    res.json({
      message: "Car created successfully",
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle known error types
      res.status(500).json({
        message: error.message,
        success: false,
        error: error,
        stack: error.stack,
      });
    } else {
      // Handle unknown error types
      res.status(500).json({
        message: "An unknown error occurred",
        success: false,
        error: error,
      });
    }
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    // const { searchTerm } = req.query;
    const result = await CarServices.getCarsFromDB(req.query);
    res.status(200).json({
      message: "Cars retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle known error types
      res.status(500).json({
        message: error.message,
        success: false,
        error: error,
        stack: error.stack,
      });
    } else {
      // Handle unknown error types
      res.status(500).json({
        message: "An unknown error occurred",
        success: false,
        error: error,
      });
    }
  }
};

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDB(carId);
    if (!result) {
      res.status(404).json({
        message: "Car Not Found",
        status: false,
        data: result,
      });
    }
    res.json({
      message: "Car retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle known error types
      res.status(500).json({
        message: error.message,
        success: false,
        error: error,
        stack: error.stack,
      });
    } else {
      // Handle unknown error types
      res.status(500).json({
        message: "An unknown error occurred",
        success: false,
        error: error,
      });
    }
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const updateData = req.body;
    const result = await CarServices.updateCarInDB(carId, updateData);
    if (!result) {
      res.status(404).json({
        message: "No Car found for this ID",
        status: false,
        data: result,
      });
    }
    res.json({
      message: "Car updated successfully",
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle known error types
      res.status(500).json({
        message: error.message,
        success: false,
        error: error,
        stack: error.stack,
      });
    } else {
      // Handle unknown error types
      res.status(500).json({
        message: "An unknown error occurred",
        success: false,
        error: error,
      });
    }
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.deleteCarInDB(carId);
    if (!result) {
      res.status(404).json({
        message: "No car found in database by this id",
        success: false,
        data: {},
      });
    }
    res.json({
      message: "Car deleted successfully",
      success: true,
      data: {},
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // handle known error types
      res.status(500).json({
        message: error?.message,
        success: false,
        error: error,
        stack: error.stack,
      });
    } else {
      // Handle unknown error types
      res.status(500).json({
        message: "An unknown error occurred",
        success: false,
        error: error,
      });
    }
  }
};

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
