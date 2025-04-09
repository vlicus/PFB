import getPool from "./getPool.js";
import bcrypt from "bcryptjs";
import { randomUUID as uuid } from "crypto";

const main = async () => {
  // Variable que almacenará una conexión con la base de datos.
  let pool;

  const hashedPass = await bcrypt.hash("abc123", 10);

  try {
    pool = await getPool();

    console.log("Borrando tablas...");

    await pool.query(
      "DROP TABLE IF EXISTS rental_history, ratings, rent_images, rent, users"
    );

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
            CREATE TABLE IF NOT EXISTS rent (
    id CHAR(36) PRIMARY KEY NOT NULL,
    property_owner_id CHAR(36) NOT NULL,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    num_rooms SMALLINT,
    description TEXT,
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
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rent_id) REFERENCES rent(id)
)
        `);

    // Tabla de valoracion.
    await pool.query(`
CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id CHAR(36) NOT NULL,
    recipient_id CHAR(36) NOT NULL,
    is_owner BOOLEAN DEFAULT false,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    comment TEXT,
    rating_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id)
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
    FOREIGN KEY (rent_id) REFERENCES rent(id),
    FOREIGN KEY (renter_id) REFERENCES users(id)
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

    console.log("¡Admin insertado!");
  } catch (err) {
    console.error(err);
  } finally {
    // Cerramos el proceso.
    process.exit();
  }
};

// Ejecutamos la función anterior.
main();
