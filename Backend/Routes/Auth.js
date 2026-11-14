import express from "express";

import {
    Register,
    Login,
    Me,
    Logout
} from "../controllers/AuthController.js";

import authMiddleware from "../Middelware/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", authMiddleware, Me);
router.post("/logout", Logout);

export default router;