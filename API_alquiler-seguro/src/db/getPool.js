import mysql from "mysql2/promise";

// Obtenemos las variables de entorno necesarias mediante destructuring.
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  MYSQL_PORT,
} from "../../env.js";

// Variable que almacená un grupo (array) de conexiones.
let pool;

// Función que retorna un pool de conexiones con la base de datos.
const getPool = async () => {
  try {
    // Si la variable "pool" es undefined...
    if (!pool) {
      // Creamos una pool temporal.
      const poolTemp = mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        port: MYSQL_PORT || 3306,
      });

      // Con el pool temporal creamos la base de datos si no existe.
      await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

      // Creamos un grupo de conexiones.
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        port: MYSQL_PORT || 3306,
        timezone: "local",
      });
    }

    // Retornamos un pool.
    return pool;
  } catch (err) {
    console.error(err);
  }
};

// Exportamos la función.
export default getPool;
