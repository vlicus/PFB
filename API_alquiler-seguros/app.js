// Dependencias
import express from "express";
import cors from "cors";
// Variables de entorno
import { PORT } from "./env.js";
//Importamos los errores
import {
  notFoundController,
  errorController,
} from "./src/controllers/errors/index.js";
// Se crea el servidor
const app = express();

// Middleware que "desencripta" un body en formato "raw" creando la propiedad "body" en el objeto "request".
app.use(express.json());

// Inicio (/), Sin esto da error por que intenta cargar la ruta / igualmente, aunque no esté definida
app.use("/", (req, res) => {
  res.send("Hello, world!");
});

//Middleware de ruta no encontrada
app.use(notFoundController);

//Middleware de errores
app.use(errorController);

app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
