import { Router } from "express";
import { sendColor, turnLEDOff } from "../controllers/color.controller.js";

const router = Router();

router.post("/", sendColor);
router.post("/led/off", turnLEDOff);

export default router;