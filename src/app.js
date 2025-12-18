import express from "express";
import cors from "cors";
import routes from "../routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// rotas reais
app.use("/api", routes);

export default app;
