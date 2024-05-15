import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pictures: {
      type: [String],
      default: "",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice:{
      type: Number,
      required:true,
      default: 0,
    },
    subcategory: {
      category: {
        type: String,
        enum: [
          "DrybuildingMixtures",
          "Primers",
          "ReadyMadeBuildingMixtures",
          "DrywallAndComponents",
          "SkirtingBoards",
          "AdhesivesSealantsSilicones",
          "ScotchTapeFilm",
          "Tools",
          "PlywoodTimberFiberboard",
          "DecorativeCorners",
          "Thresholds",
          "WallpaperFiberglass",
          "Fasteners",
        ],
        default: "",
      },
      name: {
        type: String,
        required: true,
      },
    },
    manufacturer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Decimal128,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre("save", async function (next) {
  const product = this;
  if(product.discount>0){
    product.totalPrice = product.price *100 /product.discount
  }
  else{
    product.totalPrice = product.price
  }
  next();
});

export default mongoose.model("Product", ProductSchema);
