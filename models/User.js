import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    passwordHash:{
        type: String,
        required: true,
    },
    cart: {
        type: [
          {
            item: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
          },
        ],
        default: [],
    },

}, {
 timestamps: true,
},
);

export default mongoose.model('User', UserSchema);