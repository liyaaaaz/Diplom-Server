// import express from 'express';
// import mongoose  from 'mongoose';
// import {registerValidation, loginValidation, orderValidation} from './validations.js';

// import checkAuth from './utils/checkAuth.js'
// import * as UserController from './controllers/UserController.js'
// import * as OrderController from './controllers/OrderController.js'

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/Auth.js";
import clothRoutes from "./routes/Products.js";
import { connectDB } from "./connection/connectdb.js";
import { register } from "./controllers/UserController.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({ path: ".env.dev" });

app.use("/auth", authRoutes);
app.post("/auth/register", register);

app.use("/cloth", clothRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[server] alive on ${PORT}`);
  });
});

// mongoose.connect('mongodb+srv://admin:wwwwww@cluster.dpy4npv.mongodb.net/Sklad5?retryWrites=true&w=majority&appName=Cluster',)
// .then(() => console.log('DB OK'))
// .catch((err) => console.log('DB error', err));

// const app = express();

// app.use(express.json());

// app.post('/auth/login',loginValidation, UserController.login);
// app.post('/auth/register',registerValidation, UserController.register);
// app.get('/auth/me', checkAuth, UserController.getMe);

// app.post('/bag/order', checkAuth ,orderValidation, OrderController.order);
// app.get('/bag/order', OrderController.getAllOrdes);

// app.listen(4444, (err) => {
//     if(err){
//         return console.log(err);
//     }

//     console.log('server ok');
// });
