import { Router } from "express"
import { login, register, me } from "../controller/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', async (req, res) => { gamesController.readAll(req, res) });
router.post('/', async (req, res) => { gamesController.create(req, res) });

router.post("/login", login)
router.post("/register", register)
router.get("/me", auth, me);


export default router;
