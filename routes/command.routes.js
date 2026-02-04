import { Router } from 'express';
import { sendDeviceCommand } from '../controller/command.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', auth, sendDeviceCommand);
export default router;
