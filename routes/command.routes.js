import { Router } from "express";

const router = Router({ mergeParams: true });

router.post("/", (req, res) => {
  res.status(202).json({ message: "command accepted (stub)" });
});

export default router;
