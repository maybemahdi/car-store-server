import { Router } from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";

const OrderRoutes = Router();

OrderRoutes.post("/", auth("user", "admin"), OrderControllers.orderCar);
OrderRoutes.get("/verify", auth("user"), OrderControllers.verifyPayment);
OrderRoutes.get("/revenue", OrderControllers.getTotalRevenue);

export default OrderRoutes;
