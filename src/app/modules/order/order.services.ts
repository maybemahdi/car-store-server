import { Car } from "../car/car.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const orderCar = async (orderData: IOrder) => {
  const car = await Car.findById(orderData.car);

  if (!car) {
    return { status: false, message: "Car not found." };
  }

  if (car.quantity < orderData.quantity) {
    return {
      status: false,
      message: `Insufficient stock. Only ${car.quantity} unit(s) available.`,
    };
  }

  if (orderData.totalPrice !== car?.price * orderData.quantity) {
    return {
      status: false,
      message: `Total price must be Quantity * Car Price Per Unit`,
    };
  }

  const newOrder = await Order.create(orderData);

  car.quantity -= orderData.quantity;
  car.inStock = car.quantity > 0;
  await car.save();

  return {
    message: "Order created successfully",
    status: true,
    data: newOrder,
  };
};

const getTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  return result[0];
};

export const OrderServices = {
  orderCar,
  getTotalRevenue,
};
