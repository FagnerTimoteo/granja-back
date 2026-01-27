import { Router } from 'express';

import authRoutes from './auth.routes.js';
import sensorsRoutes from './sensors.routes.js';
import configRoutes from './config.routes.js';
import commandRoutes from './command.routes.js';
import actionsRoutes from './actions.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/sensors', sensorsRoutes);
router.use('/config', configRoutes);
router.use('/actions', actionsRoutes);
router.use('/command', commandRoutes);

export default router;
