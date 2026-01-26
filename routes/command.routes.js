import { Router } from 'express';
import { sendDeviceCommand } from '../controller/command.controller.js';

const router = Router();

router.post('/', sendDeviceCommand);
export default router;
