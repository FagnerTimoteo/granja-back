import { Router } from "express";

const router = Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.status(200).json({});
});

router.put("/", (req, res) => {
  res.status(501).json({ message: "config update not implemented" });
});

export default router;
