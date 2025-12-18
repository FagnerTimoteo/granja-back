import mongoose from "mongoose";
import app from "./app.js";

const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/banco")
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
