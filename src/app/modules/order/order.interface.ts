import mongoose from "mongoose";

export interface IOrder {
  userId?: string;
  email: string;
  car: mongoose.Types.ObjectId; // ObjectId referencing the car
  quantity: number;
  totalPrice: number;
  address: string;
  phone: string;
  status?: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction?: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  shippingStatus?: "Pending" | "Processing" | "Shipped" | "Delivered";
}
