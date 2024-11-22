import { Router } from "express";
import { OrderControllers } from "./order.controller";

const OrderRoutes = Router();

OrderRoutes.post("/", OrderControllers.orderCar);

export default OrderRoutes;
