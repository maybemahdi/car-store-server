import { Router } from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";

const OrderRoutes = Router();

OrderRoutes.post("/", auth("user", "admin"), OrderControllers.orderCar);
OrderRoutes.get("/verify", auth("user", "admin"), OrderControllers.verifyPayment);
OrderRoutes.get("/revenue", auth("admin"), OrderControllers.getTotalRevenue);
OrderRoutes.get("/:id", OrderControllers.getOrdersByCustomer);
OrderRoutes.get("/", auth("admin"), OrderControllers.getAllOrders);
OrderRoutes.patch("/update-status", auth("admin"), OrderControllers.updateShippingStatus);

export default OrderRoutes;
