import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json([]);
});

router.patch("/:id", (req, res) => {
  res.status(501).json({ message: "alert update not implemented" });
});

export default router;
