import express from "express";
import { login, logout, protect, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);
router.use(protect);

router.route("/logout").get(protect, logout);

export default router;
