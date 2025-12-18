import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  res.status(501).json({ message: "login not implemented" });
});

router.post("/register", (req, res) => {
  res.status(501).json({ message: "register not implemented" });
});

router.get("/me", (req, res) => {
  res.status(501).json({ message: "me not implemented" });
});

export default router;
