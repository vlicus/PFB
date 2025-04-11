// Dependencias
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
// Variables de entorno
import { PORT, UPLOADS_DIR } from "./env.js";

// Importamos las rutas
import userRoutes from "./src/routes/userRoutes.js";

//Importamos los errores
import {
  notFoundController,
  errorController,
} from "./src/controllers/errors/index.js";

// Se crea el servidor
const app = express();

app.use(cors());
// Middleware que "desencripta" un body en formato "raw" creando la propiedad "body" en el objeto "request".
app.use(express.json());

// Middleware que indica a express donde están las rutas
app.use(userRoutes);

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use("/media", express.static(UPLOADS_DIR));

// Middleware que "desencripta" un body en formato "form-data" creando la propiedad
// "body" y la propiedad "files" en el objeto "request"
app.use(fileUpload());

// Inicio (/), Sin esto da error por que intenta cargar la ruta / igualmente, aunque no esté definida
app.use("/", (req, res) => {
  res.send("Hello, world!");
});

//Middleware de ruta no encontrada
app.use(notFoundController);

//Middleware de errores
app.use(errorController);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
