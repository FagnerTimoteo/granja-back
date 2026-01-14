import { Router } from 'express';
import { createAction, listActions } from '../controller/actions.controller.js';

const router = Router();

router.post('/', createAction);
router.get('/', listActions);

export default router;
