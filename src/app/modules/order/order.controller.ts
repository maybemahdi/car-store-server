import { Request, Response } from "express";
import { IOrder } from "./order.interface";
import { OrderServices } from "./order.services";

const orderCar = async (req: Request, res: Response) => {
  try {
    const orderData: IOrder = req.body;
    const result = await OrderServices.orderCar(orderData);
    res.json({
      ...result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({
        message: "An Unknown Error Occurred",
        status: false,
        error: error,
        stack: error.stack,
      });
    } else {
      res.json({
        message: "An Unknown Error Occurred",
        status: false,
        error: error,
      });
    }
  }
};

export const OrderControllers = {
  orderCar,
};
