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

  car.quantity -= orderData.quantity;
  if (car.quantity === 0) {
    car.inStock = false;
  }
  await car.save();

  const newOrder = await Order.create(orderData);
  return {
    message: "Order created successfully",
    status: true,
    data: newOrder,
  };
};

export const OrderServices = {
  orderCar,
};
