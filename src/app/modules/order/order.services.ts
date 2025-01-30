/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import { Car } from "../car/car.model";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { orderUtils } from "./order.utils";
import httpStatus from "http-status";

const orderCar = async (orderData: IOrder, user: any, client_ip: string) => {
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

  let newOrder = await Order.create({ ...orderData, userId: user.id });

  car.quantity -= orderData.quantity;
  car.inStock = car.quantity > 0;
  await car.save();

  // payment integration
  const shurjopayPayload = {
    amount: orderData.totalPrice,
    order_id: newOrder._id,
    currency: "BDT",
    customer_name: user.name,
    customer_address: orderData.address,
    customer_email: user.email,
    customer_phone: orderData.phone,
    customer_city: user.city || "Dhaka",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    newOrder = await newOrder.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;

  // return {
  //   message: "Order created successfully",
  //   status: true,
  //   data: newOrder,
  // };
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status == "Cancel"
                ? "Cancelled"
                : "",
      },
    );
  }

  return verifiedPayment;
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

const getOrdersByCustomer = async (id: string) => {
  const isCustomerExist = await User.findById(id);
  if (!isCustomerExist) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
  }
  const result = await Order.find({ userId: id }).populate({
    path: "car",
    model: Car,
  });
  return {
    data: result,
  };
};

const getAllOrders = async () => {
  const result = await Order.find().populate({
    path: "car",
    model: Car,
  });
  return {
    data: result,
  };
};

const updateShippingStatus = async (payload: {
  id: string;
  shippingStatus: string;
}) => {
  const result = await Order.findByIdAndUpdate(
    payload?.id,
    {
      shippingStatus: payload.shippingStatus,
    },
    { new: true },
  );
  
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND, "Something went wrong!")
  }

  return result;
};

export const OrderServices = {
  orderCar,
  verifyPayment,
  getTotalRevenue,
  getOrdersByCustomer,
  getAllOrders,
  updateShippingStatus,
};
