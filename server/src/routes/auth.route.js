import express from "express";
import {
    checkAuth,
  Login,
  Logout,
  Register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.post("/logout", Logout);

router.put("/updateProfile", isAuthenticate, updateProfile);

router.get("/check",isAuthenticate,checkAuth)

export default router;
