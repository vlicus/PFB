import getPool from "./getPool.js";
import bcrypt from "bcryptjs";
import { randomUUID as uuid } from "crypto";
import fs from "fs/promises";
import path from "path";

import { UPLOADS_DIR } from "../../env.js";

const main = async () => {
  // Variable que almacenará una conexión con la base de datos.
  let pool;

  const hashedPass = await bcrypt.hash("abc123", 10);
  const uploads = path.resolve(UPLOADS_DIR);

  try {
    pool = await getPool();

    console.log("Borrando tablas...");

    await pool.query(
      "DROP TABLE IF EXISTS rental_history, ratings, rent_images, rents, users"
    );

    // Cada vez que se ejecute el initDb se borrara la carpeta uploads que almacena las imagenes
    await fs.rm(uploads, { recursive: true, force: true });
    console.log("Carpeta 'uploads' eliminada correctamente.");

    console.log("Creando tablas...");

    // Creamos la tabla de usuarios.
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    bio TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar VARCHAR(255),
    active BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT FALSE,
    registration_code CHAR(30),
    recovery_code CHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)	
        `);

    // Creamos la tabla de alquiler.
    await pool.query(`
            CREATE TABLE IF NOT EXISTS rents (
    id CHAR(36) PRIMARY KEY NOT NULL,
    property_owner_id CHAR(36) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    num_rooms SMALLINT NOT NULL,
    description TEXT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_owner_id) REFERENCES users(id)
)
        `);

    // Creamos la tabla de fotos.
    await pool.query(`
            CREATE TABLE IF NOT EXISTS rent_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rent_id CHAR(36) NOT NULL,
    name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rent_id) REFERENCES rents(id)
)
        `);

    // Tabla de historial.
    await pool.query(`
CREATE TABLE IF NOT EXISTS rental_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rent_id CHAR(36) NOT NULL,
    renter_id CHAR(36) NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    status ENUM('PENDING','APPROVED','REJECTED','ACTIVE','CANCELLED','COMPLETED'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rent_id) REFERENCES rents(id),
    FOREIGN KEY (renter_id) REFERENCES users(id)
)
        `);

    // Tabla de valoracion.
    await pool.query(`
CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36) NOT NULL,
    recipient_id CHAR(36) NOT NULL,
    rental_history_id INT NOT NULL,
    is_owner BOOLEAN DEFAULT false,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    comment TEXT,
    rating_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    FOREIGN KEY (rental_history_id) REFERENCES rental_history(id)
)
        `);

    console.log("¡Tablas creadas!");

    await pool.query(
      `
  INSERT INTO users (
    id,
    email,
    username,
    phone_number,
    bio,
    password,
    active,
    is_admin,
    registration_code,
    recovery_code
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid(),
        "admin@ejemplo.com",
        "admin",
        "+34911111222",
        "Administrador del sistema.",
        hashedPass,
        true,
        true,
        "123456abcd",
        null,
      ]
    );

    await pool.query(
      `
  INSERT INTO users (
    id,
    email,
    username,
    phone_number,
    bio,
    password,
    active,
    is_admin,
    registration_code,
    recovery_code
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid(),
        "casero@yopmail.com",
        "casero",
        "+34911111222",
        "Casero.",
        hashedPass,
        true,
        false,
        "123456abcd",
        null,
      ]
    );

    console.log("¡Admin y casero insertado!");
  } catch (err) {
    console.error(err);
  } finally {
    // Cerramos el proceso.
    process.exit();
  }
};

// Ejecutamos la función anterior.
main();
