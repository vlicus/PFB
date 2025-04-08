// Dependencias
import express from "express";

// Variables de entorno
import { PORT } from "./env.js";

// Importamos las rutas
import userRoutes from "./src/routes/userRoutes.js";

// Se crea el servidor
const app = express();

// Middleware que "desencripta" un body en formato "raw" creando la propiedad "body" en el objeto "request".
app.use(express.json());

// Middleware que indica a express donde están las rutas
app.use(userRoutes);

// Inicio (/), Sin esto da error por que intenta cargar la ruta / igualmente, aunque no esté definida
app.use("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
