import express from "express";

const router = express.Router();

import { Register, Login, Logout } from "../controllers/AuthController.js"


router.post("/register", Register)
router.post("/login", Login)
router.post("/logout", Logout)



export default router;