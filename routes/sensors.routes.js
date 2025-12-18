import { Router } from "express";

const router = Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.status(200).json([]);
});

export default router;
