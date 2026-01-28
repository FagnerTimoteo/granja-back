import { Router } from 'express';
import { createAlert, getAllAlerts } from '../controller/alerts.controller.js';

const router = Router();

router.post('/', createAlert);
router.get('/', getAllAlerts);

export default router;
