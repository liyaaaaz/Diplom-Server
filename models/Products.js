import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pictures: {
        type: [String],
        default: "",
    },
    price: {
        type:Number,
        required: true,
        default: 0,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    manufacturer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    

}, {
 timestamps: true,
},
);

export default mongoose.model('Product', ProductSchema);