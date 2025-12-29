import { Router } from "express";
import { getConfig, updateConfig } from "../controller/config.controller.js";

const router = Router();

router.get("/", getConfig);
router.put("/", updateConfig);

export default router;
