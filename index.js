import express from "express";
import mongoose from "mongoose";
import { registerValidation, orderValidation } from "./validations.js";
import multer from "multer";
import fs from "fs";
import * as checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as OrderController from "./controllers/OrderController.js";
import * as ProductsController from "./controllers/ProductsController.js";
import cors from "cors";
import Auth from "./routes/Auth.js";
import dotenv from "dotenv";

// 1. Сначала загружаем переменные окружения
dotenv.config();

// 2. Создаем приложение
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Подключаемся к БД (используем переменную окружения)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

// 5. Настройка загрузки файлов
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

// 6. Статические файлы
app.use("/uploads", express.static("uploads"));

// 7. Маршруты (Routes)
app.use("/auth", Auth);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth.checkAuth, UserController.getMe);
app.put("/me", checkAuth.checkAuth, UserController.updateProfile);
app.get("/me/orders", checkAuth.checkAuth, OrderController.getUserOrders);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/postorder", checkAuth.checkAuth, OrderController.order);
app.get("/order", OrderController.getAllOrdes);

app.get("/products", ProductsController.getAllProducts);
app.get("/products/getDiscountedProducts", ProductsController.getDiscountedProducts);
app.post("/createproducts", ProductsController.newProducts);
app.post("/deleteproducts", checkAuth.verifyAdminToken, ProductsController.deleteProducts);
app.post("/products/:id", checkAuth.verifyAdminToken, ProductsController.editProducts);

// 8. Запуск сервера
const port = process.env.PORT || 4444;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK on port ${port}`);
});
