import { model, Schema } from "mongoose";
import { ICar } from "./car.interface";

const CarSchema: Schema = new Schema<ICar>(
  {
    brand: { type: String, required: [true, "Brand Name is Required"] },
    model: { type: String, required: [true, "Model Name is Required"] },
    year: { type: Number, required: [true, "Year Field is Required"] },
    price: {
      type: Number,
      min: [0, "Price must be a positive number"],
      required: [true, "Price is Required"],
    },
    category: {
      type: String,
      enum: {
        values: ["Sedan", "SUV", "Truck", "Coupe", "Convertible"],
        message: "{VALUE} is not a valid category",
      },
      required: [true, "Category is Required"],
    },
    description: { type: String, required: [true, "Description is Required"] },
    quantity: {
      type: Number,
      min: [0, "Quantity must be positive number"],
      required: [true, "Quantity is Required"],
    },
    inStock: { type: Boolean, required: [true, "In Stock is Required"] },
  },
  { timestamps: true },
);

CarSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.__v;
    return {
      _id: ret._id,
      brand: ret.brand,
      model: ret.model,
      year: ret.year,
      price: ret.price,
      category: ret.category,
      description: ret.description,
      quantity: ret.quantity,
      inStock: ret.inStock,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});

export const Car = model<ICar>("Car", CarSchema);
