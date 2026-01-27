import { Router } from "express";

const router = Router();

// TODO: Implementar alertas quando houver modelo no banco de dados
// Por enquanto, apenas retorna array vazio

router.get("/", (req, res) => {
  res.status(200).json([
    // Alertas serão implementados posteriormente
  ]);
});

export default router;
