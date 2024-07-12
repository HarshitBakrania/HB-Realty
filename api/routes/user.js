import express from "express";
import { authMiddleware } from "../middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
    res.send("Hello World!");
});

export default router;