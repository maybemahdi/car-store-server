import mongoose, { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema: Schema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, "Please Provide your Email"],
      trim: true,
      validate: {
        validator: function (value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email validation
          return emailRegex.test(value);
        },
        message: "${VALUE} is not a valid email!",
      },
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Car is Required"],
      ref: "Car", // Reference to the car model
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is Required"],
      min: [0, "Total price must be at least 0"],
    },
  },
  { timestamps: true },
);

OrderSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.__v;
    return {
      _id: ret._id,
      email: ret._id,
      car: ret.car,
      quantity: ret.quantity,
      totalPrice: ret.totalPrice,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

export const Order = model<IOrder>("Order", OrderSchema);
