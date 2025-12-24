import { Router } from "express"
import { getAll } from "../controller/sensors.controller.js";

const router = Router({ mergeParams: true });

router.get("/", getAll);

export default router;