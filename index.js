import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  orderValidation,
  productValidation,
} from "./validations.js";
import multer from "multer";
import fs from "fs";
import * as checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as OrderController from "./controllers/OrderController.js";
import * as ProductsController from "./controllers/ProductsController.js";
import cors from "cors";

import Auth from "./routes/Auth.js";

import dotenv from "dotenv";
// import authRoutes from "./routes/Auth.js";
// import clothRoutes from "./routes/Products.js";
// import { connectDB } from "./connection/connectdb.js";
// import { register } from "./controllers/UserController.js";

// const app = express();

// app.use("/auth", authRoutes);
// app.post("/auth/register", register);

// app.use("/cloth", clothRoutes);

// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`[server] alive on ${PORT}`);
//   });
// });

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster.dpy4npv.mongodb.net/Sklad5?retryWrites=true&w=majority&appName=Cluster"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

dotenv.config({ path: ".env.dev" });

app.use(cors());

app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/auth", Auth);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth.checkAuth, UserController.getMe);

app.use("/uploads", express.static("uploads"));
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post(
  "/bag/order",
  checkAuth.checkAuth,
  orderValidation,
  OrderController.order
);
app.get("/bag/order", OrderController.getAllOrdes);

app.get("/products", ProductsController.getAllProducts);
app.post("/createproducts", ProductsController.newProducts);
app.post(
  "/deleteproducts",
  checkAuth.verifyAdminToken,
  ProductsController.deleteProducts
);
app.post(
  "/editproducts",
  checkAuth.verifyAdminToken,
  ProductsController.editProducts
);

// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`[server] alive on ${PORT}`);
//   });
// });
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server ok");
});
