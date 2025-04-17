import bcrypt from "bcryptjs";
import { randomUUID as uuid } from "crypto";
import { API_URL, PORT } from "../../../env.js";

// Importamos la función que devuelve una conexión con la base de datos
import getPool from "../../db/getPool.js";

// Importamos servicios de errores:
// TBD
import sendMailUtil from "../../utils/sendMailUtil.js";

// Importamos errores de registro
import generateErrorUtil from "../../utils/generateErrorUtil.js";

// Creamos la función que realiza una consulta a la base de datos para crear un nuevo usuario

const insertUserModel = async (
  username,
  email,
  password,
  bio,
  phone_number,
  registration_code
) => {
  const pool = await getPool();

  // Buscamos en la base de datos algún usuario con ese nombre
  let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
    username,
  ]);

  // Si existe algún usuario con ese nombre lanzamos un error
  if (users.length > 0) {
    generateErrorUtil("El username ya está registrado", 409);
  }

  const [emailCheck] = await pool.query(
    `SELECT id FROM users WHERE email = ?`,
    [email]
  );

  if (emailCheck.length > 0) {
    generateErrorUtil("El email ya está registrado", 500);
  }

  //Verificación por email:

  const emailSubject = "Activa tu usuario en Alquiler Seguro";

  //Contenido del email:

  const emailBody = `
  Bienvenido ${username}!

  Gracias por registrarte en Alquiler Seguro. Para activar tu cuenta, haz clic en el siguiente enlace:

            <a href="${API_URL + "/" + PORT}/users/validate/${
              registration_code
            }">Activar mi cuenta</a>
        `;

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody); //DE MOMENTO NO MANDAMOS EMAIL

  // Enctriptamos la password
  const hashedPass = await bcrypt.hash(password, 10);

  // Insertamos el usuario.
  await pool.query(
    `INSERT INTO users(id, username, email, password,bio, phone_number, registration_code) VALUES(?, ?, ?, ?, ?,?,?)`,
    [uuid(), username, email, hashedPass, bio, phone_number, registration_code]
  );

  // Lo creamos sin el registration_code por ahora
  /* await pool.query(
    `
        INSERT INTO users(id, username, email, password, bio, phone_number) VALUES (?,?,?,?,?,?)
        `,
    [uuid(), username, email, hashedPass, bio, phone_number]
  ); */
};

export default insertUserModel;
