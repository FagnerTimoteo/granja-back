import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.status(201).json({ message: "device created (stub)" });
});

router.get("/", (req, res) => {
  res.status(200).json([]);
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    id: req.params.id,
    online: false,
    lastSeen: null
  });
});

router.patch("/:id", (req, res) => {
  res.status(501).json({ message: "update device not implemented" });
});

router.delete("/:id", (req, res) => {
  res.status(204).send();
});

export default router;
