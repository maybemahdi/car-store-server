import express, { Application, Request, Response } from "express";
import cors from "cors";
import CarRoutes from "./app/modules/car/car.routes";
import OrderRoutes from "./app/modules/order/order.routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/cars", CarRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Car Store is Running");
});

export default app;
