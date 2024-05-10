import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    surname: {
        type : String,
        required: true,
    },
    secondName: String,
    phone: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        }
    ],
    totalPrice:{
        type: Number,
        required: true,
        default: 0,
    },
    adress:  String,
    comment:String,
    

}, {
 timestamps: true,
},
);

OrderSchema.pre("save", async function (next) {
    const order = this;
    order.totalPrice = 0;
    for (const prod of order.products) {
      const product = await productId.findById(prod.products);
      order.totalPrice += product.price * prod.quantity;
    }
    next();
  });

export default mongoose.model('Order', OrderSchema);