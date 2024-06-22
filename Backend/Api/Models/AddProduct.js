import mongoose from "mongoose";
const { Schema, models } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    quality: Number,
    image: String,
    year: Number,
    type: String,
    episodeNumber: Number,
  },
  {
    timestamps: true,
  }
);
const ProductModel = models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
