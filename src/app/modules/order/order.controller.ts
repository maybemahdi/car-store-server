import { Request, Response } from "express";
import { IOrder } from "./order.interface";
import { OrderServices } from "./order.services";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const orderCar = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const orderData: IOrder = req.body;
    const result = await OrderServices.orderCar(orderData, user, req.ip!);
    res.json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: typeof result === 'object' && 'message' in result ? result.message : "Order placed successfully",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({
        message: "Error Occurred",
        success: false,
        error: error,
        stack: error.stack,
      });
    } else {
      res.json({
        message: "Error Occurred",
        success: false,
        error: error,
      });
    }
  }
};

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

 res.json({
   statusCode: httpStatus.CREATED,
   message: "Order verified successfully",
   data: order,
 });
});

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getTotalRevenue();
    res.json({
      message: "Revenue calculated successfully",
      status: true,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.json({
        message: "Error Occurred",
        status: false,
        error: error,
        stack: error.stack,
      });
    } else {
      res.json({
        message: "Error Occurred",
        status: false,
        error: error,
      });
    }
  }
};

export const OrderControllers = {
  orderCar,
  getTotalRevenue,
  verifyPayment,
};
