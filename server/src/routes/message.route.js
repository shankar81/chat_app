import express from "express";
import { isAuthenticate } from "../middleware/auth.middleware.js";
import { getAllUsers, getmessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", isAuthenticate, getAllUsers);

router.get("/:id", isAuthenticate, getmessages);

router.post("/send/:id", isAuthenticate, sendMessage);


export default router;
