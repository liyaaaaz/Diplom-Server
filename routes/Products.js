import express from "express";
import { verifyToken } from "../utils/checkAuth.js";
import {
  getAllProducts,
  newProducts,
  deleteProducts,
  editProducts,
} from "../controllers/ProductsController.js";

const router = express.Router();
router.get("/getAllProducts", getAllProducts);
router.post("/createProducts", verifyToken, newProducts);
router.post("/deleteProducts", verifyToken, deleteProducts);
router.post("/:id", verifyToken, editProducts);

export default router;