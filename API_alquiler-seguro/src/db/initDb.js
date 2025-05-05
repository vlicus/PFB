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
  INSERT INTO users (id,email,username,phone_number,bio,password,active,is_admin,registration_code,recovery_code
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
  INSERT INTO users (id,email,username,phone_number,bio,password,active,is_admin,registration_code,recovery_code
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
    await pool.query(
      `
  INSERT INTO users (id, email, username, phone_number, bio, password, first_name, last_name, active, is_admin
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        "aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "alicia@example.com",
        "alicia123",
        "+34123456789",
        "Me encanta alquilar pisos bonitos.",
        hashedPass,
        "Alicia",
        "Gómez",
        true,
        false,
      ]
    );
    await pool.query(
      `
  INSERT INTO users (id, email, username, phone_number, bio, password, first_name, last_name, active, is_admin
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        "bob@example.com",
        "bob456",
        "+34698765432",
        "Propietario de varios pisos en Madrid.",
        hashedPass,
        "Bob",
        "Martínez",
        true,
        false,
      ]
    );
    await pool.query(
      `
  INSERT INTO users (id, email, username, phone_number, bio, password, first_name, last_name, active, is_admin
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        "cccc3333-cccc-cccc-cccc-cccccccccccc",
        "carla@example.com",
        "carla789",
        "+34987654321",
        "Buscando mi primer alquiler.",
        hashedPass,
        "Carla",
        "López",
        true,
        false,
      ]
    );
    await pool.query(
      `
  INSERT INTO rents (id, property_owner_id, address, city, price, num_rooms, description, is_available, is_approved)
VALUES
('d1a1-a1a1-a1a1-a1a1-d1a1a1a1a1a1', 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Calle Sol 45', 'Valencia', 780.00, 2, 'Apartamento soleado en el centro de Valencia.', true, true),
('d1a2-a1a2-a1a2-a1a2-d1a2a2a2a2a2', 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Paseo Marítimo 8', 'Valencia', 950.00, 3, 'Piso con vistas al mar.', true, true);`
    );
    await pool.query(
      `
INSERT INTO rents (id, property_owner_id, address, city, price, num_rooms, description, is_available, is_approved)
VALUES
('d2b1-b2b1-b2b1-b2b1-d2b1b1b1b1b1', 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Calle Serrano 90', 'Madrid', 2000.00, 4, 'Ático de lujo en barrio Salamanca.', true, true),
('d2b2-b2b2-b2b2-b2b2-d2b2b2b2b2b2', 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Calle Lavapiés 3', 'Madrid', 700.00, 2, 'Piso artístico y bohemio.', true, true);
`
    );
    await pool.query(
      `
INSERT INTO rents (id, property_owner_id, address, city, price, num_rooms, description, is_available, is_approved)
VALUES
('d3c1-c3c1-c3c1-c3c1-d3c1c1c1c1c1', 'cccc3333-cccc-cccc-cccc-cccccccccccc', 'Calle Verano 12', 'Sevilla', 630.00, 1, 'Estudio reformado con patio interior.', true, true),
('d3c2-c3c2-c3c2-c3c2-d3c2c2c2c2c2', 'cccc3333-cccc-cccc-cccc-cccccccccccc', 'Av. de Andalucía 20', 'Sevilla', 980.00, 3, 'Ideal para familias, con balcón grande.', true, true);
`
    );
    await pool.query(
      `
INSERT INTO rent_images (rent_id, name)
VALUES
-- Alice
('d1a1-a1a1-a1a1-a1a1-d1a1a1a1a1a1', 'sol_45_1.jpg'),
('d1a1-a1a1-a1a1-a1a1-d1a1a1a1a1a1', 'sol_45_2.jpg'),
('d1a2-a1a2-a1a2-a1a2-d1a2a2a2a2a2', 'maritimo_8_1.jpg'),
('d1a2-a1a2-a1a2-a1a2-d1a2a2a2a2a2', 'maritimo_8_2.jpg'),

-- Bob
('d2b1-b2b1-b2b1-b2b1-d2b1b1b1b1b1', 'serrano_90_1.jpg'),
('d2b1-b2b1-b2b1-b2b1-d2b1b1b1b1b1', 'serrano_90_2.jpg'),
('d2b2-b2b2-b2b2-b2b2-d2b2b2b2b2b2', 'lavapies_3_1.jpg'),
('d2b2-b2b2-b2b2-b2b2-d2b2b2b2b2b2', 'lavapies_3_2.jpg'),

-- Carla
('d3c1-c3c1-c3c1-c3c1-d3c1c1c1c1c1', 'verano_12_1.jpg'),
('d3c1-c3c1-c3c1-c3c1-d3c1c1c1c1c1', 'verano_12_2.jpg'),
('d3c2-c3c2-c3c2-c3c2-d3c2c2c2c2c2', 'andalucia_20_1.jpg'),
('d3c2-c3c2-c3c2-c3c2-d3c2c2c2c2c2', 'andalucia_20_2.jpg');
`
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
