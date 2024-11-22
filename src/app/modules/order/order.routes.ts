import { Router } from "express";
import { OrderControllers } from "./order.controller";

const OrderRoutes = Router();

OrderRoutes.post("/", OrderControllers.orderCar);
OrderRoutes.get("/revenue", OrderControllers.getTotalRevenue);

export default OrderRoutes;
