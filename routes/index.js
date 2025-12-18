import { Router } from "express";

import authRoutes from "./auth.routes.js";
import devicesRoutes from "./devices.routes.js";
import sensorsRoutes from "./sensors.routes.js";
import configRoutes from "./config.routes.js";
import commandRoutes from "./command.routes.js";
import alertsRoutes from "./alerts.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/devices", devicesRoutes);
router.use("/alerts", alertsRoutes);

// Sub-rotas de dispositivos
router.use("/devices/:id/sensors", sensorsRoutes);
router.use("/devices/:id/config", configRoutes);
router.use("/devices/:id/command", commandRoutes);

export default router;
