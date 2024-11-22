import mongoose from "mongoose";

export interface IOrder {
  email: string;
  car: mongoose.Types.ObjectId; // ObjectId referencing the car
  quantity: number;
  totalPrice: number;
}
