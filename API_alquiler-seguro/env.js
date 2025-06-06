/* process.loadEnvFile(); */

import "dotenv/config";

export const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  MYSQL_PORT,
  PORT,
  SECRET,
  UPLOADS_DIR,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FRONT_URL,
  API_URL,
  FRONT_PORT,
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  ADMIN_EMAIL,
} = process.env;
