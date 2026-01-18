import { Router } from 'express';
import {
  createDevice,
  listDevices,
  getDeviceById,
  updateDevice,
  deleteDevice,
} from '../controller/devices.controller.js';

const router = Router();

router.post('/', createDevice);
router.get('/', listDevices);
router.get('/:id', getDeviceById);
router.patch('/:id', updateDevice);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

export default router;
