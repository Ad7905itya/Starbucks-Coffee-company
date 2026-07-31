import express from "express";
import { getHandcraft } from "../controllers/handcarft.js";

const router = express.Router();

router.get("/handcraft", getHandcraft);

export default router;