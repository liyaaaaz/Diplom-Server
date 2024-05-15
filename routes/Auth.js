import express from "express";
import { getMe, login } from "../controllers/UserController.js";
// import { verifyToken } from "../utils/checkAuth.js";

const router = express.Router();

router.post("/login", login);
// router.get("/me", verifyToken, getMe);

export default router;
