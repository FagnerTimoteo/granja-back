import { Router } from 'express';
import { getAll, createReading } from '../controller/sensors.controller.js';

const router = Router({ mergeParams: true });

router.get('/', getAll);
router.post('/', createReading);

export default router;
