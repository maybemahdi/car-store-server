import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import CarRoutes from "./app/modules/car/car.routes";
import OrderRoutes from "./app/modules/order/order.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import AuthRoutes from "./app/modules/auth/auth.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://car-shop-frontend-lilac.vercel.app",
    ], // Allow requests from your Vite app
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods if necessary
    credentials: true, // If you're using cookies or HTTP authentication
  }),
);
app.use(cookieParser());

// get started
const getRoot = (req: Request, res: Response) => {
  res.send("Car Store is Running");
};
app.get("/", getRoot);

// application routes
app.use("/api/cars", CarRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/auth", AuthRoutes);

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
